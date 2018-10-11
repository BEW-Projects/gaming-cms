import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    message: String,
    screenName: String
}, { timestamps: true })

module.exports = mongoose.model('Chat', ChatSchema)
