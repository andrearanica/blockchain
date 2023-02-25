import { createHash } from 'crypto'

export const mine = (req, res) => {
    class Block {
        constructor (hash, previousHash, timeStamp, nonce, data) {
            this.hash = hash
            this.previousHash = previousHash
            this.timeStamp = timeStamp,
            this.nonce = nonce,
            this.data = data
        }
    }
    
    const chain = []
    
    const block = new Block('', '', new Date(), 0, 'ciao')
    block.timeStamp = new Date()
    
    do {
        block.hash = createHash('sha256').update(block.hash + block.timeStamp + block.nonce + block.data).digest('hex')
        block.nonce++;
    } while (block.hash.substring(0, 5) !== '00000');
    
    if (chain.lenght > 0) {
        block.previousHash = chain[chain.length].hash
    }
    chain.push(block)
    
    res.json(chain)
}