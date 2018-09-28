const router = require('express').Router()

// Import controllers
import pages from './controllers/pages'

// Some middleware we run on all routes eg. storing session as local variable
router.use((req,res, next) => {
    next()
})

// Index route 
router.get('/', (req, res) => {
    pages.Page.find().then(pages => {
        res.render('index', { name: process.env.npm_package_name, pages: pages })
    }).catch(err => { console.log(err) })
})

// Pages routes
router.get('/pages', pages.renderPage)
router.get('/pages/new', pages.newPage)
router.post('/pages', pages.createPage)

// A catch-all redirect to the page-not-found template
router.all('*', (req, res) => {
    res.render('404', { reason: 'Page Not Found!'})
})

module.exports = router