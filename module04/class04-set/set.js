const assert = require('assert')

const arr1 = [1,2,3]
const arr2 = [2,4,3]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), [1,2,2,3,3,4])

const set = new Set()

arr1.map(item=>set.add(item))
arr2.map(item=>set.add(item))

assert.deepStrictEqual(Array.from(set), [1,2,3,4])
assert.deepStrictEqual(Array.from(new Set([...arr1,...arr2])), [1,2,3,4])

assert.ok(set.has(2))

const users01 = new Set ([
    'joao',
    'gui',
    'karol'
])

const users02 = new Set ([
    'joao',
    'erick',
    'karol'
])

const intersection = new Set([...users01].filter(item => users02.has(item)))

assert.deepStrictEqual(Array.from(intersection), ['joao', 'karol'])

const difference = new Set([...users01].filter(item => !users02.has(item)))

assert.deepStrictEqual(Array.from(difference), ['gui'])