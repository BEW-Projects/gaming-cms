const router = require('express').Router()

// Import controllers
import pages from './controllers/pages'

// Some middleware we run on all routes eg. storing session as local variable
router.use((req,res, next) => {
    next()
})

// Index route 
router.get('/', (req, res) => {
    res.render('index', { name: process.env.npm_package_name })
})

// Pages routes
router.get('/pages', pages.renderPage)

// A catch-all redirect to the page-not-found template
router.all('*', (req, res) => {
    res.render('page-not-found', { reason: 'Page Not Found!'})
})

module.exports = router