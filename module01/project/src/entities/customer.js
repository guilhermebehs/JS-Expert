const Base = require('./base')

class Customer extends Base{

    constructor({id,name, age}){
        super({id, name})
        this.id = id
        this.name = name
        this.age = age
    }

}

module.exports = Customer