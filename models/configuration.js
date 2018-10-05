import mongoose from 'mongoose'

const ConfigurationSchema = new mongoose.Schema({
    name: String,
    value: String
}, { _id: false })

module.exports = mongoose.model('Configuration', ConfigurationSchema)
