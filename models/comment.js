import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId
        ref: 'Article'
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)
