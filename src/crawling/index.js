import axios from 'axios';
import * as cheerio from 'cheerio';
import DBOperations from '../vector storage/mongoDB.js';

const SKIP_PATTERNS = [
    'login',
    'signup',
    'register',
    'cart',
    'checkout'
];

/**
 * Normalize URL (remove query, hash, etc.)
 */
const normalizeUrl = (url) => {
    try {
        const u = new URL(url);
        return `${u.origin}${u.pathname}`;
    } catch {
        return null;
    }
};

/**
 * Decide whether a URL should be skipped
 * Skip if:
 *  - matches skip pattern
 *  - already exists in DB
 */
const shouldSkip = async (url) => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return true;

    // 1. Keyword-based skip
    const hasSkipPattern = SKIP_PATTERNS.some(word =>
        normalizedUrl.toLowerCase().includes(word)
    );

    if (hasSkipPattern) return true;

    // 2. DB duplicate check
    const existsInDb = Boolean(
        await DBOperations.findUrlExist(normalizedUrl)
    );

    return existsInDb;
};

/**
 * Crawl a single page
 */
async function crawlPage(url, baseDomain) {
    try {
        const { data } = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        const $ = cheerio.load(data);
        const title = $('title').text() || 'No title';

        const links = [];
        const linkElements = $('a[href]').toArray();

        // IMPORTANT: async-safe loop
        for (const el of linkElements) {
            const href = $(el).attr('href');
            if (!href) continue;

            try {
                const absoluteUrl = new URL(href, url).href;
                const linkDomain = new URL(absoluteUrl).hostname;

                if (
                    linkDomain === baseDomain &&
                    !(await shouldSkip(absoluteUrl))
                ) {
                    const normalized = normalizeUrl(absoluteUrl);
                    if (normalized) links.push(normalized);
                }
            } catch { }
        }

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

/**
 * Extract readable text from HTML
 */
const extractMainText = ($) => {
    $('script, style, noscript, svg, img').remove();

    return $('body')
        .text()
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Crawl entire website (BFS)
 */
async function crawlWebsite(baseUrl, maxDepth = 2, maxPages = 4) {
    const baseDomain = new URL(baseUrl).hostname;

    const visited = new Set();
    const results = [];
    const queue = [{ url: baseUrl, depth: 0 }];

    while (queue.length > 0 && visited.size < maxPages) {
        const { url, depth } = queue.shift();

        if (visited.has(url) || depth > maxDepth) continue;
        if (await shouldSkip(url)) continue;

        console.log(`📥 Crawling: ${url}`);
        visited.add(url);

        const pageData = await crawlPage(url, baseDomain);
        if (!pageData) continue;

        results.push({
            url: pageData.url,
            title: pageData.title,
            text: pageData.text
        });

        for (const link of pageData.links) {
            if (!visited.has(link)) {
                queue.push({ url: link, depth: depth + 1 });
            }
        }
    }

    return results;
}

export default crawlWebsite;
