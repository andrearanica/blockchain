import { User } from '../models/user.js'
import { createHash } from 'crypto'
import { Block } from '../models/block.js'
import jwt from 'jsonwebtoken'

export const mine = async (req, res) => {
    
    // const block = new Block('', '', new Date(), 0, 'ciao')
    // block.timeStamp = new Date()

    let blockchain = []

    try {
        blockchain = await Block.find()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

    const block = {
        hash: '',
        previousHash: '',
        nonce: 0,
        data: req.query.data,
        timeStamp: new Date()
    }
    
    do {
        block.hash = createHash('sha256').update(block.hash + block.timeStamp + block.nonce + block.data).digest('hex')
        block.nonce++;
    } while (block.hash.substring(0, 5) !== '00000')
    
    if (blockchain.length > 0) {
        block.previousHash = blockchain[blockchain.length - 1].hash
    }
    blockchain.push(block)

    let username = ''
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return console.log(error)
        }
        username = user.username
    })

    // Pay user
    try {
        const userId = await User.findOne({ username: username })
        const user = await User.findByIdAndUpdate(userId._id, { coins: userId.coins + 1 }, { new: true })
    } catch (error) {
        console.log('User not found')
    }

    // Check validity
    blockchain.push(block)
    let valid = true
    for (let i = 1; i < blockchain.length - 1; i++) {
        let found = false
        for (let j = 0; j < blockchain.length - 1; j++) {
            if (blockchain[i].previousHash === blockchain[j].hash && i !== j) {
                found = true
            }
        }
        if (!found) {
            valid = false
        }
    }

    // Save block
    const newBlock = new Block(block)
    if (valid) {
        try {
            await newBlock.save()
            res.status(201).json(block)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        return res.status(400).json({ message: 'invalid blockchain' })
    }

}

export const getBlockchain = async (req, res) => {
    try {
        const blockchain = await Block.find()
        res.status(200).json(blockchain)
    } catch (error) {
        res.status(400).json(error.message)
    }
}