import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.send({ message: 'null token' })

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.json({ message: error.message })
        }

        req.user = user

        next()
    })
}