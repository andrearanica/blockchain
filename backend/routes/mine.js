import express from 'express'
import { getBlockchain, mine } from '../controllers/mine.js'

const router = express.Router()

router.get('/', getBlockchain)
router.post('/', mine)

export default router