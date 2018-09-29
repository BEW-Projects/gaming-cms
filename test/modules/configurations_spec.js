import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import Configurations from '../../controllers/configurations'
const should = chai.should()

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('Configurations', () => {
    it('getTheme() should return a string', (done) => {
        Configurations.getTheme().should.be.a('string')
        done()
    })
})