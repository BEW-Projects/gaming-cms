import Comment from '../models/comment'

// create a comment
exports.create = (req, res) => {
    Comment.create(req.body).then((comment) => {
        res.status(200).send(comment)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}

// get all comments or a specific comment by query term ?_id=
exports.get = (req, res) => {

    // by query term
    if(req.query._id) {
        Comment.find({ _id: req.query._id }).limit(1).then((comments) => {
            res.status(200).send(comments[0])
        }).catch((error) => {
            res.status(400).send(error.message)
            console.error(error.message)
        })
    } else {
        //get all
        Comment.find().then((comments) => {
            res.status(200).send(comments)
        }).catch((error) => {
            res.status(400).send(error.message)
            console.error(error.message)
        })
    }
}

// updates one comment by _id
exports.update = (req, res) => {
    Comment.updateOne({ _id: req.query._id }, req.body).then((comment) => {
        res.status(200).send(comment)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}

// deletes one comment by _id
exports.delete = (req, res) => {
    Comment.deleteOne({ _id: req.query._id }).then((comment) => {
        res.status(200).send(comment)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}
