import chai from 'chai'
import chaitHttp from 'chai-http'
import server from '../../index'
import Article from '../../models/article'
import mongoose from 'mongoose'
const should = chai.should()

// Chai setup
chai.use(chaitHttp)

// test article
const testArticle = {
    "title": "chaiTestArticle",
    "content": "a bunch of giberish",
    "authorId": mongoose.Types.ObjectId(),
    "tags": [mongoose.Types.ObjectId()]
}

// Run our tests
describe('Articles', () => {

    // delete our test articles when finished
    after(async () => {
        try{
            await Article.deleteMany({ title: 'chaiTestArticle' }).exec()
        } catch(e) {
            console.error(e.message)
        }

    })

    // TEST SHOW ONE
    it('should show a SINGLE article on /articles?_id= GET', async () => {
        try {
            const article = await Article.create(new Article(testArticle))
            const res =  await chai.request(server).get(`/articles?_id${article._id}`)
            res.should.have.status(200)
            res.should.be.html

        } catch (e) {
            throw e
        }
    })

    // TEST SHOW ALL
    it('should index ALL articles on /articles GET', async () => {
        try {
            const res = await chai.request(server).get('/articles')
            res.should.have.status(200)
            res.should.be.html
        } catch (e) {
            throw e
        }
    })

    // TEST NEW
    it('should display new form on /articles/new GET', async () => {
        try {
            const res = await chai.request(server).get('/articles/new')
            res.should.have.status(200)
            res.should.be.html
        } catch (e) {
            throw e
        }
    })

    // TEST CREATE
    it('should create a SINGLE article on /articles POST', async () => {
        try {
            const res = await chai.request(server).post('/articles').send(testArticle)
            res.should.have.status(200)
            res.should.be.json
        } catch (e) {
            throw e
        }
    })

    // TODO: test edit

    // TEST UPDATE
    it('should update a SINGLE article on /articles?_id= PUT', async () => {
        try {
            const article = await Article.create(testArticle)
            const updates = { "content": "more giberish" }
            const res = await chai.request(server).put(`/articles?_id=${article._id}`).send(updates)
            res.should.have.status(200)
            res.should.be.json
        } catch (e) {
            throw e
        }
    })

    // TEST DELETE
    it('should delete a SINGLE article on /articles?_id= DELETE', async () => {
        try {
            const article = await Article.create(testArticle)
            const res = await chai.request(server).delete(`/articles?_id=${article._id}`)
            res.should.have.status(200)
            res.should.be.json
        } catch (e) {
            throw e
        }
    })
})
