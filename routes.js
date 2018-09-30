const router = require('express').Router()

// Import controllers
import pages from './controllers/pages'
import configurations from './controllers/configurations'

// Some middleware we run on all routes eg. storing session as local variable
router.use((req,res, next) => {
    // set local variable currentTheme to database entry or default if none
    res.locals.currentTheme = configurations.getTheme()
    // set local variable name
    res.locals.name = process.env.npm_package_name
    next()
})

// Index route 
router.get('/', (req, res) => {
    res.render('index')
})

// Pages routes
router.get('/pages', pages.renderPage)
router.get('/pages/new', pages.newPage)
router.post('/pages', pages.createPage)

// A catch-all redirect to the 404 template
router.all('*', (req, res) => {
    res.status(404).render('404', { reason: 'Page Not Found!'})
})

module.exports = router