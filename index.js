// Module imports
import 'babel-polyfill'
import express from 'express'
import nunjucks from 'nunjucks'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
const MongoStore = require('connect-mongo')(session)
const app = express()

// Custom imports and variables
import routes from './routes'
import Chat from './models/chat'

// Connect to our database and set up our sessions
mongoose.connect(process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
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

// Configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Configure express
app.set('view engine', 'njk')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./assets'))
app.use(routes.router)

// Start our app
let server = app.listen(process.env.PORT || 3000, () => {
    console.log("App is started on port 3000!")
})

 // Socket.io for chat
 const io = require('socket.io')(server)

 io.on('connection', (socket) => {

    // not used currently
     socket.on('disconnect', function(){

     })

    // called when client side javascript emits message event
     socket.on('message', function(msg) {
        Chat.create({
                 message: msg,
                 screenName: routes.screenName
             }).then((chat) => {
                 io.emit('message', chat)
             })
     })
 })

// Export our app so we can use for tests
module.exports = app
