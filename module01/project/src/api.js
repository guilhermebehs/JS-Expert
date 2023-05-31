const {createServer} = require('http')
const {join} = require('path')
const {once} = require('events')
const CarService = require('./service/carService')
const BaseRepository = require('./repositories/base')

class Api {
    constructor(){
        const customerDatabase = join(__dirname, './../database',"customer.json")
        const categoryDatabase = join(__dirname, './../database',"carCategories.json")
        const carDatabase = join(__dirname, './../database',"cars.json")

        this.customerRepository = new BaseRepository({file: customerDatabase})
        this.categoryRepository = new BaseRepository({file: categoryDatabase})
        this.carService = new CarService({cars:carDatabase})
    }

     getRoutes(){
        return {
            '/rent:post': async(req,res)=>{
                const {customerId, categoryId, numberOfDays} = JSON.parse(await once(req,'data'))

                if(!customerId || !categoryId || !numberOfDays){
                  res.writeHead(400)
                  return res.end()
                }
                   
                const customer = await this.customerRepository.find(customerId)
                if(!customer){
                  res.writeHead(404)
                  return res.end('customer does not exist')
                }
                const category = await this.categoryRepository.find(categoryId)
                if(!category){
                  res.writeHead(404)
                  return res.end('category does not exist')
                }
                const receipt = await this.carService.rent(customer, category, numberOfDays)
        
                res.writeHead(201)
                return res.end(JSON.stringify(receipt))
            }, 
        }
    }

    async handle(req,res){
        const {url, method} = req

        const routes = this.getRoutes()
        const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
        const route = routes[routeKey]

        return route(req,res)

    }

    createHttpServer(){
       return createServer((req,res)=> this.handle(req,res))
          .listen(3000, ()=>console.log("listening at 3000"))
    }
}

module.exports = Api