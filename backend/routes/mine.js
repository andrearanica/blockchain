import express from 'express'
import { getBlockchain, mine } from '../controllers/mine.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', authenticateToken, getBlockchain)
router.post('/', authenticateToken, mine)

export default router