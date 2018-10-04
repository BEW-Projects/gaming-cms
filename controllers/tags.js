import Tag from '../models/tag'

// creates tag and returns new tag object
exports.createTag = async function createTag(data) {
    try {
        return await Tag.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns single tag by _id
exports.getTag = async function getTag(id) {
    try {
        return await Tag.findById(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns array of tags that match query
exports.getTags = async function getTags(query) {
    try {
        return await Tag.find(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates tag by id and returns updated tag
exports.updateTag = async function updateTag(id, updatedData) {
    try {
        return await Tag.findByIdAndUpdate(id, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates tags that match query and returns query results
exports.updateTags = async function updateTags(query, updatedData) {
    try {
        return await Tag.updateMany(query, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete tag by _id and return deleted tag
exports.deleteTag = async function deleteTag(id) {
    try {
        return await Tag.findByIdAndRemove(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete tags that match query and return query results
exports.deleteTags = async funciton deleteTags(query) {
    try {
        return await Tag.deleteMany(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Tag = Tag
