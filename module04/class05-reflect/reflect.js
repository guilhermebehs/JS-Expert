const assert = require('assert')

const myObj = {
    add(val){
        return this.arg1 + this.arg2 + val
    }
}

assert.deepStrictEqual(myObj.add.apply({arg1: 1, arg2: 5},[10]),16)

//codigo malicioso mudou comportamento do apply
myObj.add.apply = function(){throw new Error('eita')}

assert.throws(
    ()=> myObj.add.apply(myObj.add.apply({arg1: 1, arg2: 5},[10])),
    {
        name: 'Error',
        message: 'eita'
    })

// evita pegar a implementação maliciosa da linha 12    
const result = Reflect.apply(myObj.add, {arg1: 1, arg2: 5},[10])    
assert.deepStrictEqual(result, 16)




function MyFunction(){}

// mesma coisa, mas o segundo é mais bonito
Object.defineProperty(MyFunction, 'withObject', {value: ()=> 'Hey there'})
Reflect.defineProperty(MyFunction, 'withReflect', {value: ()=> 'Hey there2'})

assert.deepStrictEqual(MyFunction.withObject(), 'Hey there')
assert.deepStrictEqual(MyFunction.withReflect(), 'Hey there2')



const withDelete = {
    user: 'some user'
}

//nao é performatico, evitar
delete withDelete.user

const withReflect = {
    user: 'some user'
}

Reflect.deleteProperty(withReflect, 'user')

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)
assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false)


//mesma coisa, só que mais elegante
assert.ok('user' in {user: ''})
assert.ok(Reflect.has({user: ''}, 'user'))


//mesma coisa, só que mais elegante
assert.deepStrictEqual(Reflect.ownKeys({user: ''}), ['user'])

