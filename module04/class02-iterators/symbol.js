const assert = require('assert')

//A ideia é acessar a propriedade apenas com a unique key. O dado se torna privado pra que nao tem a key,
//mas NÃO é secreto!
const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

assert.deepStrictEqual(user['userName'], 'value for normal Objects')
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')
assert.deepStrictEqual(user[Symbol('userName')], undefined)

const datesKey = Symbol('dates')
const joinDatesMethod = Symbol('joinDates')

class MyDate{  
     
    constructor(...args){
        this[datesKey] = args.map(arg=> new Date(...arg).toISOString())
    }

    getDates(){
        return this[joinDatesMethod]()
    }

    [joinDatesMethod](){
        return this[datesKey].join(',')
    }
}

const myDate = new MyDate([2021,1,10], [2020,1,10])
assert.deepStrictEqual(myDate.mykey, undefined)
assert.deepStrictEqual(myDate.joinDates, undefined)
assert.deepStrictEqual(myDate.getDates(), '2021-02-10T03:00:00.000Z,2020-02-10T03:00:00.000Z')
