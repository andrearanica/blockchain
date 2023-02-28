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
        data: String(''),
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
        console.log(userId._id)
        const user = await User.findByIdAndUpdate(userId._id, { cost: 8 }, { new: true })
    } catch (error) {
        console.log('User not found')
    }

    // Save block
    const newBlock = new Block(block)
    try {
        await newBlock.save()
        res.status(201).json(block)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getBlockchain = async (req, res) => {
    try {
        const blockchain = await Block.find()

       let error = false
        if (blockchain.length > 1) {
            error = true
            blockchain.map(block => {
                for (let i = 0; i < blockchain.length - 1; i++) {
                    if (blockchain[i].hash = block.previousHash) {
                        error = false
                    }
                }
            })
        }
        

        if (!error) {
            res.status(200).json(blockchain)
        } else {
            res.status(400).json({ message: 'blockchain not valid' })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}