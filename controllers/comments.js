import Comment from '../models/comment'

// creates comment and returns new comment
exports.createOne = async (data) => {
    try {
        return await Comment.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns single comment by _id
exports.getOne = async (id) => {
    try {
        return await Comment.findById(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns array of comments that match query
exports.getMany = async (query) => {
    try {
        return await Comment.find(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates comment by _id and returns updated comment
exports.updateOne = async (id, updatedData) => {
    try {
        return await Comment.findByIdAndUpdate(id, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates comments that match query and returns query result
exports.updateMany = async (query, updatedData) => {
    try {
        return await Comment.updateMany(query, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete comment by _id and returns deleted comment
exports.deleteOne = async (id) => {
    try {
        return await Comment.findByIdAndRemove(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// deletes comments that match query and returns query result
exports.deleteMany = async (query) => {
    try {
        return await Comment.deleteMany(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Comment = Comment
