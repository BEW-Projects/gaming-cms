import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: String, 
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    created: Date,
    lastModified: Date,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

module.exports = mongoose.model('Article', ArticleSchema)