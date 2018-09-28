import mongoose from 'mongoose'

const ConfigurationSchema = new mongoose.Schema({
    name: String,
    value: String
})

module.exports = mongoose.model('Configuration', ConfigurationSchema)