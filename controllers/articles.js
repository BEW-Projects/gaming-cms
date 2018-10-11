import Article from '../models/article'

// render new article form
exports.new = (req, res) => {
    res.render('modules/articles/articles-new')
}

// create an article
exports.create = (req, res) => {
    Article.create(req.body).then((article) => {
        res.status(200).send(article)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}

// get all articles or a specific article by query term ?_id=
exports.get = (req, res) => {

    // by query term
    if(req.query._id) {

        // make sure our query term is a valid object id
        if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
            return res.status(404).render('modules/app/404', { reason: 'Invalid Article Id or query term!' })
        }

        Article.find({ _id: req.query._id }).limit(1).then((articles) => {
            res.render('modules/articles/articles-show', {
                article: articles[0]
            })
        }).catch((error) => {
            console.error(error.message)
        })
    } else {
        //get all
        Article.find().then((articles) => {
            res.render('modules/articles/articles', {
                articles: articles
            } )
        }).catch((error) => {
            console.error(error.message)
        })
    }
}

// updates one article by _id
exports.update = (req, res) => {
    Article.updateOne({ _id: req.query._id }, req.body).then((article) => {
        res.status(200).send(article)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}

// deletes one article by _id
exports.delete = (req, res) => {
    Article.deleteOne({ _id: req.query._id }).then((article) => {
        res.status(200).send(article)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}
