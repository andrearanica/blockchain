/*
BLOCKCHAIN
Ogni blocco contiene
    - Hash: firma che si basa su tutti i dati del blocco
    - previousHash: hash del blocco precedente, in modo che ogni blocco si leghi ad un altro formando una chain
    - nonce: bit che varia continuamente al fine di variare l'hash
    - data: i dati contenuti nel blocco

Per inserire un nuovo blocco avviene mining: trovo un hash fino a quando questo non soddisfa una specifica condizione (es. inizia con tot zeri)
Per minare devo cambiare il nonce, che è un numero


*/
import express from 'express'
import mineRouter from './routes/mine.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use('/mine', mineRouter)

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT)
})

