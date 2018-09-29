// Module imports
import express from 'express'
import nunjucks from 'nunjucks'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
const MongoStore = require('connect-mongo')(session)
const app = express()

// Custom imports and variables
import routes from './routes'

// Connect to our database and set up our sessions
mongoose.connect(process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    app.use(session({
        secret: 'fluffybunnies1231247753',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1800000 // 30 minutes (milliseconds)
        },
        store: new MongoStore({
            mongooseConnection: db 
        })
    }))
})

// Save our session as a local variable for each client accessible by the templates
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// Configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Configure express
app.set('view engine', 'njk')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./assets/themes'))
app.use(routes)

// Start our app
app.listen(process.env.PORT || 3000, () => {
    console.log("App is started on port 3000!")
})