import Tag from '../models/tag'

// creates tag and returns new tag object
exports.createTag = async function createTag(data) {
    Tag.create(data).then((tag) => {
        return tag
    }).catch((err) => {
         console.log(err) 
    })
}

// returns single tag by _id
exports.getTag = async function getTag(id) {
    Tag.findById(id).then((tag) => {
        return tag
    }).catch((err) => {
         console.log(err) 
    })
}

// returns collection of tags that match array of _id
exports.getTags = async function getTags(ids) {
    let tags = {}
    for (var i = 0; i < ids.length; i++)
    {
        let tag = await getTag(id[i])
        tags.push(tag)
    }
    return tags
}

// updates tag by id and returns updated tag
exports.updateTag = async function updateTag(id, updatedData) {
    Tag.findByIdAndUpdate(id, updatedData).then((tag) => {
        return tag
    }).catch((err) => {
        console.log(err)
    })
}

// delete tag by _id and return deleted tag
exports.deleteTag = async function deleteTag(id) {
    Tag.findByIdAndRemove(id).then((tag) => {
        return tag
    }).catch((err) => {
        console.log(err)
    })
}

// Export our model to be used by the router if needed
exports.Tag = Tag