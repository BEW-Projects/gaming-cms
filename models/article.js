import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Article', ArticleSchema)
