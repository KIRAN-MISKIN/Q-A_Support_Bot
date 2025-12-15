import express from 'express'
import controller from '../controller/controller.js'

const router = express.Router()

router.post('/crawl', controller.crawler)
router.post('/ask', controller.getData)

export default router;