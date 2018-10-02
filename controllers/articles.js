import Article from '../models/article'

// creates article and returns new article object
exports.createArticle = async function createArticle(data) {
    Article.create(data).then((article) => {
        return article
    }).catch((err) => {
        console.log(err)
    })
}

// returns single article by _id
exports.getArticle = async function getArticle(id) {
    Article.findById(id).then((article) => {
        return article
    }).catch((err) => {
        console.log(err)
    })
}

// returns collection of articles that match req.query
exports.getArticles = async function getArticles(query) {
    Article.find(query).then((articles) => {
        
    })
}

// Export our model to be used by the router if needed
exports.Article = Article