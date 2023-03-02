import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[0]
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.json({ message: error.message })
        }

        req.user = user

        res.status(200).json(user)
    })
}