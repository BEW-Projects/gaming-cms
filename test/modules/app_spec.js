import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
const should = chai.should()

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('App', () => {
    it('get / should render index', async () => {
        try {
            const res = await chai.request(server).get('/')
            res.should.have.status(200)
            res.should.be.html
        } catch (e) {
            throw e
        }
    })

    it('get /invalidpath should render 404', (done) => {
        chai.request(server)
            .get('/invalidpath')
            .end((err, res) => {
                res.should.have.status(404)
                res.should.be.html
                done()
            })
    })
})
