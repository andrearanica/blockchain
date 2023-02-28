import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    coins: Number
})

export const User = mongoose.model('User', userSchema)