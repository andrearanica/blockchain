import mongoose from 'mongoose'

const blockSchema = mongoose.Schema({
    hash: {
        type: String,
        require: true
    },
    previousHash: {
        type: String,
        require: true
    },
    nonce: {
        type: Number,
        require: true
    },
    data: {
        type: String,
        require: true
    }
}, { timeStamps: true })

export const Block = mongoose.model('Block', blockSchema)