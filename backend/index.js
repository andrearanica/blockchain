/*
BLOCKCHAIN
Ogni blocco contiene
    - Hash: firma che si basa su tutti i dati del blocco
    - previousHash: hash del blocco precedente, in modo che ogni blocco si leghi ad un altro formando una chain
    - nonce: bit che varia continuamente al fine di variare l'hash
    - data: i dati contenuti nel blocco

Per inserire un nuovo blocco avviene mining: trovo un hash fino a quando questo non soddisfa una specifica condizione (es. inizia con tot zeri)
Per minare devo cambiare il nonce, che è un numero

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


*/
import mongoose from 'mongoose'
import express from 'express'
import mineRouter from './routes/mine.js'
import authRouter from './routes/auth.js'

import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery', false)

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', mineRouter)
app.use('/auth', authRouter)

mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server running on port ' + process.env.PORT)
    })
})
.catch(error => console.log(error))

