import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import Configurations from '../../controllers/configurations'
const should = chai.should()

// Chai setup
chai.use(chaiHttp)

// Run our tests
describe('Configurations', () => {
    it('getValue(\'currentTheme\') should return a string', (done) => {
        Configurations.get().then(configs => {
            configs['currentTheme'].should.be.a('string')
            done()
        })
    })
})
