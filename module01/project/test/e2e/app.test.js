const {describe, it, after,before} = require('mocha')
const {expect} = require('chai')
const supertest = require('supertest')
const {readFileSync} = require('fs')
const {join} = require('path')
const Api = require('../../src/api')
const seedBaseFolder = join(__dirname, '../../','database')


describe('Api e2e', ()=>{
    let customer, category,api, numberOfDays=5;
    before(()=>{
        api = (new Api()).createHttpServer()
        const customersRaw =  readFileSync(join(seedBaseFolder, 'customer.json'))
        const categoriesRaw = readFileSync(join(seedBaseFolder, 'carCategories.json'))
        const customers = JSON.parse(customersRaw.toString())
        customer = customers[0]

        const categories = JSON.parse(categoriesRaw.toString())
        category = categories[0]
    })
    after(()=> api.close())

    describe('POST /rent', ()=>{
        it('should return receipt and status code 201', async()=>{
           
           const {text} = await supertest(api)
                .post('/rent')
                .send({
                    customerId:customer.id,
                    categoryId: category.id,
                    numberOfDays,
                })
                .expect(201)

           const response = JSON.parse(text)     

           expect(response).to.not.be.undefined
           expect(response.customer).to.be.deep.eq({...customer})
           expect(response.car).to.not.be.undefined
           expect(response.amount).to.not.be.undefined
           expect(response.dueDate).to.not.be.undefined
               
        })

        it('should return status code 400 when no customerId is found in body', async()=>{
           
            await supertest(api)
                 .post('/rent')
                 .send({
                     categoryId: category.id,
                     numberOfDays,
                 })
                 .expect(400)
         })
        it('should return status code 400 when no categoryId is found in body', async()=>{
           
            await supertest(api)
                 .post('/rent')
                 .send({
                    customerId:customer.id,
                    numberOfDays,
                 })
                 .expect(400)
         }) 
        it('should return status code 400 when no numberOfDays is found in body', async()=>{
           
            await supertest(api)
                 .post('/rent')
                 .send({
                    customerId:customer.id,
                    categoryId: category.id,
                 })
                 .expect(400)
         }) 
        it('should return status code 404 when category does not exist', async()=>{
           
            const {text} = await supertest(api)
                 .post('/rent')
                 .send({
                     customerId:customer.id,
                     categoryId: 'invalid',
                     numberOfDays,
                 })
                 .expect(404)
  
            expect(text).to.be.eq('category does not exist')
         })
         
         it('should return status code 404 when customer does not exist', async()=>{
           
            const {text} = await supertest(api)
                 .post('/rent')
                 .send({
                     customerId: 'invalid',
                     categoryId: category.id,
                     numberOfDays,
                 })
                 .expect(404)
  
            expect(text).to.be.eq('customer does not exist')
         })
        
    })
    
})



