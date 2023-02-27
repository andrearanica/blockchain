import { createHash } from 'crypto'
import { Block } from '../models/block.js'

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
        data: req.body,
        timeStamp: new Date()
    }

    

    console.log(blockchain)
    
    do {
        block.hash = createHash('sha256').update(block.hash + block.timeStamp + block.nonce + block.data).digest('hex')
        block.nonce++;
    } while (block.hash.substring(0, 5) !== '00000')
    
    if (blockchain.length > 0) {
        block.previousHash = blockchain[blockchain.length - 1].hash
    }
    blockchain.push(block)

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
        res.status(200).json(blockchain)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}