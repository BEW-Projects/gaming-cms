import Page from '../models/page'

// render new page form
exports.new = (req, res) => {
    res.render('modules/pages/pages-new')
}

// create a page
exports.create = (req, res) => {
    Page.create(req.body).then((page) => {
        res.status(200).send(page)
    }).catch((error) => {
        res.status(400).send(error.message)
        console.error(error.message)
    })
}

// get all pages or a specific page by query term ?_id=
exports.get = (req, res) => {

    // by query term
    if(req.query._id) {

        // make sure our query term is a valid object id
        if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
            return res.render('modules/app/404', { reason: 'Invalid Page Id or query term!' })
        }

        Page.find({ _id: req.query._id }).limit(1).then((pages) => {
            res.render('modules/pages/pages-show', {
                page: pages[0]
            })
        }).catch((error) => {
            console.error(error.message)
        })
    } else {
        //get all
        Page.find().then((pages) => {
            res.render('modules/pages/pages', {
                pages: pages
            } )
        }).catch((error) => {
            console.error(error.message)
        })
    }
}
