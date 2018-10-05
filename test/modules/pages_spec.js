import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import Page from '../../models/page'
const should = chai.should()

// Test new page object
const testPage = new Page({
    'title': 'TestPageChai',
    'content': '<p>This is a test <u>page</u></p>'
})
console.log(testPage)

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('Pages', () => {

    // Dispose of our test page after testing
    after(() => {
        Page.deleteMany({ title: 'TestPageChai' }, (err) => {
            console.log(err)
        })
    })

    it('get /pages/new should render pages-new', (done) => {
        chai.request(server)
            .get('/pages/new')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('post /pages should create new page then render pages-show for new page', (done) => {
        chai.request(server)
            .post('/pages')
            .send(testPage)
            .end((err, res) => {
                chai.request(server)
                    .get(res.req.path)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.should.be.html
                        done()
                    })
            })
    })

    it('get /pages should render pages with list of pages', (done) => {
        chai.request(server)
            .get('/pages')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    it('get /pages/$_id should render 404 if id is not found or if _id is not a valid ObjectId', (done) => {
        chai.request(server)
            .get('/pages?_id=null')
            .end((err, res) => {
                res.should.have.status(404)
                res.should.be.html
                done()
            })
    })
})
