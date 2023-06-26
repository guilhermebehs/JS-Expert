const assert = require('assert')

const reference = {a: 1}

const myMap = new Map()
        .set(1, 'number 1')
        .set(`func`,()=> 'response from func')
        .set(true, `this is a boolean`)
// you can only get with the reference        
        .set(reference, `this is a reference`)


assert.deepStrictEqual(myMap.get(1), `number 1`)
assert.deepStrictEqual(myMap.get(`func`)(), `response from func`)
assert.deepStrictEqual(myMap.get(true), `this is a boolean`)
assert.deepStrictEqual(myMap.get(reference), `this is a reference`)
assert.deepStrictEqual(myMap.get({a: 1}), undefined)

const mapWithConstructor = new Map([
    [1, 'number 1'],
    [`func`,()=> 'response from func'],
    [true, `this is a boolean`],
])
   
assert.deepStrictEqual(mapWithConstructor.get(1), `number 1`)
assert.deepStrictEqual(mapWithConstructor.get(`func`)(), `response from func`)
assert.deepStrictEqual(mapWithConstructor.get(true), `this is a boolean`)
assert.ok(mapWithConstructor.has(1))
assert.ok(mapWithConstructor.delete(1))
assert.deepStrictEqual(mapWithConstructor.size, 2)
assert.deepStrictEqual(JSON.stringify([...mapWithConstructor]), `[["func",null],[true,"this is a boolean"]]`)