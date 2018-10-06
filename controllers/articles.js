import Article from '../models/article'

// createArticleRoute
exports.createArticleRoute = (req, res) => {
    exports.createOne(req.body).then(article => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                article: article
            })
        } else {
            res.redirect(`/articles?_id=${article._id}`)
        }
    })
}

// getArticlesRoute
exports.getArticlesRoute = (req, res) => {
    exports.getMany(req.query).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1 || Object.keys(req.query).length == 0) {
                res.render('modules/articles/articles', {
                    articles: articles
                })
            } else {
                res.render('modules/articles/articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// updateArticlesRoute
exports.updateArticlesRoute = (req, res) => {
    exports.updateMany(req.query, req.body).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1) {
                res.render('modules/articles/articles', {
                    articles: articles
                })
            } else {
                res.render('modules/articles/articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// deleteArticlesRoute
exports.deleteArticlesRoute = (req, res) => {
    exports.deleteMany(req.query).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1) {
                res.render('modules/articles/articles', {
                    articles: articles
                })
            } else {
                res.render('modules/articles/articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// creates article and returns new article object
exports.createOne = async (data) => {
    try {
        return await Article.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns article by _id
exports.getOne = async (id) => {
    try {
        return await Article.findById(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns array of articles that match query
exports.getMany = async (query) => {
    try {
        return await Article.find(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// update article by _id and return updated article
exports.updateOne = async (id, updatedData) => {
    try {
        return await Article.findByIdAndUpdate(id, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// updates articles matching query and returns query results
exports.updateMany = async (query, updatedData) => {
    try {
        return await Article.updateMany(query, updatedData)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete article by _id and return deleted article
exports.deleteOne = async (id) => {
    try {
        return await Article.findByIdAndRemove(id)
    } catch (err) {
        return console.error(err.message)
    }
}

// delete articles matching query and return query results
exports.deleteMany = async (query) => {
    try {
        return await Article.deleteMany(query)
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Article = Article
