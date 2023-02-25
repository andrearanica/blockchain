import express from 'express'
import { mine } from '../controllers/mine.js'

const router = express.Router()

router.get('/', mine)

export default router