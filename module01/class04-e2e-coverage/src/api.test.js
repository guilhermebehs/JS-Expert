const {describe, it} = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
let app

describe('API Suite Test', ()=>{
    before((done)=>{
      app = require('./api')
      app.once('listening',done)
    })
    after(done=> app.close(done))
    describe('GET /contacts', ()=>{
       it('should request the contact page and return HTTP status 200', async()=>{
         const response = await supertest(app)
             .get('/contacts')
             .expect(200)
         
         assert.strictEqual(response.text, 'contact us page')    
       })
    })
    describe('POST /login', ()=>{
       it('should request the login and return HTTP status 200', async()=>{
         const response = await supertest(app)
             .post('/login')
             .send({username: 'guilhermebehs', password: '12345'})
             .expect(200)
         
         assert.strictEqual(response.text, 'ok')    
       })
       it('should request the wrong login and return HTTP status 401', async()=>{
         const response = await supertest(app)
             .post('/login')
             .send({username: 'guilhermebehs', password: '1234'})
             .expect(401)
         
         assert.strictEqual(response.text, 'login failed')    
       })
    })
    describe('Default route', ()=>{
        it('should request a wrong route and return HTTP status 404', async()=>{
          const response = await supertest(app)
              .get('/wrong')
              .expect(404)
          
          assert.strictEqual(response.text, 'not found')    
        })
     })
})