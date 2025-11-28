import axios from 'axios'
import * as cheerio from "cheerio";

const SKIP_PATTERNS = [
    'login',
    'signup',
    'register',
    'cart',
    'checkout',
    'account'
];

const normalizeUrl = (url) => {
    try {
        return new URL(url).origin + new URL(url).pathname;
    } catch {
        return null;
    }
}

function checkWebsite(url) {
    if (!url) return false;
    if (!url.includes(".")) return false

    let newUrl = url.trim();

    // Add https:// if missing
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
        newUrl = "https://" + newUrl;
    }

    // Add trailing slash if missing
    if (!newUrl.endsWith("/")) {
        newUrl = newUrl + "/";
    }

    return newUrl;
}

const shouldSkip = (url) => {
    return SKIP_PATTERNS.some(word => url.toLowerCase().includes(word));
}

async function crawlPage(url, baseDomain) {
    try {
        const { data } = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });
        const $ = cheerio.load(data);

        const title = $('title').text() || 'No title';

        const links = [];

        $("a[href]").each((i, el) => {
            const href = $(el).attr("href");
            if (!href) return;

            try {
                const absoluteUrl = new URL(href, url).href;
                const linkDomain = new URL(absoluteUrl).hostname;

                if (linkDomain === baseDomain && !shouldSkip(absoluteUrl)) {
                    links.push(normalizeUrl(absoluteUrl));
                }
            } catch (err) { }
        });

        const cleanText = extractMainText($);

        return {
            url,
            title,
            text: cleanText,
            html: data,
            links: [...new Set(links)]
        };

    } catch (err) {
        console.log(`❌ Failed to crawl: ${url}`);
        return null;
    }
}

const extractMainText = ($) => {
    $('script, style, noscript, svg,img').remove()

    return $('body')
        .text()
        .replace(/\s+/g, ' ')
        .trim();
}


async function crawlWebsite(baseUrl, maxDepth = 2, maxPages = 2) {
    const mainurl = await checkWebsite(baseUrl)
    if (!mainurl) {
        return false
    }
    const baseDomain = new URL(mainurl).hostname;

    const visited = new Set();
    const results = [];

    const queue = [{ url: mainurl, depth: 0 }];

    while (queue.length > 0 && visited.size < maxPages) {
        const { url, depth } = queue.shift();

        if (visited.has(url) || depth > maxDepth) continue;
        if (shouldSkip(url)) continue;

        console.log(`📥 Crawling: ${url}`);
        visited.add(url);

        const pageData = await crawlPage(url, baseDomain);
        if (!pageData) continue;

        results.push({
            url: pageData.url,
            title: pageData.title,
            text: pageData.text
        });

        // Push new links into queue
        for (let link of pageData.links) {
            if (!visited.has(link)) {
                queue.push({ url: link, depth: depth + 1 });
            }
        }
    }

    return results;
}
export default crawlWebsite