import Page from '../models/page'

exports.renderPage = (req, res) => {
    
    // If no id is specified, page not found
    if(!req.query._id) {
        res.render('404', { reason: 'Page Not Found!' })
        return
    }
    
    Page.findById(req.query._id).then(page => {
        
        // If id not found in db, page not found
        if(!page) {
            res.render('404', { reason: 'Page Not Found!' })
            return
        }
        
        res.render('pages', { title: page.title, content: page.content })

    }).catch(err => { console.log(err) })
}

exports.newPage = (req, res) => {
    res.render('pages-new')
}

exports.createPage = (req, res) => {
    // Create the page then render page
    console.log(req.body);
    Page.create(req.body).then(page => {
        res.redirect(`pages?_id=${page._id}`)
    }).catch(err => { console.log(err) })
}

// Export our model to be used by the router if needed
exports.Page = Page