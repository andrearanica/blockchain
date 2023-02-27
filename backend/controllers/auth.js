import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username: username, password: hashedPassword })

    try {
        await user.save()
        res.status(201).json({ message: 'OK' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
        return res.send(404).json({ message: 'bad username' })
    } else {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                username: username,
            }, process.env.JWT_SECRET)
            return res.status(200).json({ token: token })
        }
    }

    
}