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
assert()