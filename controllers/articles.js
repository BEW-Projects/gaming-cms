import Article from '../models/article'
import mongoose from 'mongoose'

exports.createArticleRoute = (req, res) => {
    let testArticle = {
        title: "articletest",
        content: "hello world",
        authorId: mongoose.Types.ObjectId(),
        created: new Date,
        lastModified: new Date,
        tags: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
    }
    if(testArticle) {
        exports.createArticle(testArticle).then(article => {
            res.render('articles', { article: article })
        })

    }
}

exports.getArticlesRoute = (req, res) => {
    if(req.query) {
        exports.getArticles(req.query).then(articles => {
            res.render('articles', { articles: articles })
        })
    }
}

// creates article and returns new article object
exports.createArticle = async function createArticle(data) {
    try{
        return await Article.create(data)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// returns single article by _id
exports.getArticle = async function getArticle(id) {
    try{
        return await Article.findById(id)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// returns array of articles that match req.query
exports.getArticles = async function getArticles(query) {
    try{
        return await Article.find(query)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// updates article and returns updated article
exports.updateArticle = async function updateArticle(id, updatedData) {
    try{
        return await Article.findByIdAndUpdate(id, updatedData)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// delete article by _id and return deleted article
exports.deleteArticle = async function deleteArticle(id) {
    try{
        return await Article.findByIdAndRemove(id)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// delete articles matching req.query and return array of articles deleted
exports.deleteArticles = async function deleteArticles(query) {
    try{
        return await Article.deleteMany(query)
    } catch(err) {
        console.error(err.message)
        return
    }
}

// Export our model to be used by the router if needed
exports.Article = Article
