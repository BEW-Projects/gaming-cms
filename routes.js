const router = require('express').Router()

// Import controllers
import pages from './controllers/pages'
import configurations from './controllers/configurations'
import articles from './controllers/articles'
import members from './controllers/members'
import chats from './controllers/chats'

// Some middleware we run on all routes eg. storing session as local variable
router.use((req,res, next) => {
    // get our configurations
    configurations.get().then(configs => {
        res.locals.currentTheme = configs['currentTheme']
        res.locals.name = configs['siteName']
        next()
    })

    // if session, set local variable session
    res.locals.session = req.session

    // if member, set exported variable
    if(req.session.member) {
        exports.screenName = req.session.member.screenName
    }

})
// Index route
router.get('/', (req, res) => {
    res.render('index')
})

// Pages Routes
router.get('/pages', pages.renderPage)
router.get('/pages/new', pages.newPage)
router.post('/pages', pages.createPage)

// Articles Routes
router.route('/articles')
    .get(articles.getArticlesRoute)
    .post(articles.createArticleRoute)
    .put(articles.updateArticlesRoute)
    .delete(articles.deleteArticlesRoute)
router.get('/articles/new', (req, res) => {
    res.render('modules/articles/articles-new')
})

// Members routes
router.get('/members/new', members.new)
router.post('/members', members.create)
router.post('/members/logout', members.logout)
router.post('/members/login', members.login)

// Chats Routes
router.get('/chats', chats.getAll)

// A catch-all redirect to the 404 template
router.all('*', (req, res) => {
    res.status(404).render('modules/app/404', { reason: 'Page Not Found!'})
})

exports.router = router
exports.screenName = ''
