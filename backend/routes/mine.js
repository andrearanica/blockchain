import express from 'express'
import { getBlockchain, mine } from '../controllers/mine.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getBlockchain)
router.post('/', mine)

export default router