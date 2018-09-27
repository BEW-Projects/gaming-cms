// Module imports
import express from 'express'
import nunjucks from 'nunjucks'
const app = express()

// Custom imports and variables
import routes from './routes'

// Configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Configure express
app.set('view engine', 'njk')
app.use(routes)

// Start our app
app.listen(process.env.PORT || 3000, () => {
    console.log("App is started on port 3000!")
})