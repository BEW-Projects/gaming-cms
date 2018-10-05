import Tag from '../models/tag'

// creates tag and returns new tag object
exports.createOne = async (data) => {
    try {
        return await Tag.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns single tag by _id
exports.getOne = async (id) => {
    try {
        return await Tag.findById(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns array of tags that match query
exports.getMany = async (query) => {
    try {
        return await Tag.find(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates tag by id and returns updated tag
exports.updateOne = async (id, updatedData) => {
    try {
        return await Tag.findByIdAndUpdate(id, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates tags that match query and returns query results
exports.updateMany = async (query, updatedData) => {
    try {
        return await Tag.updateMany(query, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete tag by _id and return deleted tag
exports.deleteOne = async (id) => {
    try {
        return await Tag.findByIdAndRemove(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete tags that match query and return query results
exports.deleteMany = async (query) => {
    try {
        return await Tag.deleteMany(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Tag = Tag
