exports.renderPage = (req, res) => {
    res.render('page', { params: req.query })
}