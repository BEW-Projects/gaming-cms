import Article from '../models/article'

// createArticleRoute
exports.createArticleRoute = (req, res) => {
    exports.createArticle(req.body).then(article => {
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
    exports.getArticles(req.query).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1 || Object.keys(req.query).length == 0) {
                res.render('articles', {
                    articles: articles
                })
            } else {
                res.render('articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// updateArticlesRoute
exports.updateArticlesRoute = (req, res) => {
    exports.updateArticles(req.query, req.body).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1) {
                res.render('articles', {
                    articles: articles
                })
            } else {
                res.render('articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// deleteArticlesRoute
exports.deleteArticlesRoute = (req, res) => {
    exports.deleteArticles(req.query).then(articles => {
        if (req.header('Content-Type') == 'application/json') {
            res.send({
                articles: articles
            })
        } else {
            if (articles.length > 1) {
                res.render('articles', {
                    articles: articles
                })
            } else {
                res.render('articles-show', {
                    article: articles[0]
                })
            }
        }
    })
}

// creates article and returns new article object
exports.createArticle = async function createArticle(data) {
    try {
        return await Article.create(data)
    } catch (err) {
        console.error(err.message)
        return
    }
}

// returns array of articles that match req.query
exports.getArticles = async function getArticles(query) {
    try {
        return await Article.find(query)
    } catch (err) {
        console.error(err.message)
        return
    }
}

// updates articles and returns updated articles
exports.updateArticles = async function updateArticles(query, updatedData) {
    try {
        return await Article.updateMany(query, updatedData)
    } catch (err) {
        console.error(err.message)
        return
    }
}

// delete articles matching req.query and return array of articles deleted
exports.deleteArticles = async function deleteArticles(query) {
    try {
        return await Article.deleteMany(query)
    } catch (err) {
        console.error(err.message)
        return
    }
}

// Export our model to be used by the router if needed
exports.Article = Article
