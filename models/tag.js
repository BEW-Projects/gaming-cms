import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
    name: String,
    color: String
})

module.exports = mongoose.model('Tag', TagSchema)