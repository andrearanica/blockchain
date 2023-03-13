import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
        if (error) {
            return res.json({ message: error.message })
        }

        const id = user.id
        
        const userInfo = await User.findById(id)

        res.status(200).json(userInfo)
    })
}