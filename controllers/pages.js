import Page from '../models/page'
import mongoose from 'mongoose'

exports.renderPage = (req, res) => {    
    // If no id is specified show list of pages
    if(!req.query._id) {
        Page.find().then(pages => {
            res.render('pages', { pages: pages })
        }).catch(err => { console.log(err) })
    } else if (req.query._id && !mongoose.Types.ObjectId.isValid(req.query._id)) {
        res.status(404).render('404', { reason: 'Page Not Found!' })
    } else {
        Page.findById(req.query._id).then(page => {
            // If id not found in db, page not found
            if(!page) {
                res.status(404).render('404', { reason: 'Page Not Found!' })
            } else {
                res.render('pages-show', { title: page.title, content: page.content })
            }
        }).catch(err => { console.log(err) })
    }    
}

exports.newPage = (req, res) => {
    res.render('pages-new')
}

exports.createPage = (req, res) => {
    // Create the page then render page
    Page.create(req.body).then(page => {
        res.redirect(`pages?_id=${page._id}`)
    }).catch(err => { console.log(err) })
}

// Export our model to be used by the router if needed
exports.Page = Page