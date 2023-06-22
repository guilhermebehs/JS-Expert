const assert = require('assert')
const {readFile,stat, readdir} = require(`fs/promises`)

function* end(){
    yield `end`
}

function* streamData(){
   
    yield 1
    yield 2
    yield 3
    yield `ok`
    yield* end()
}

const generator = streamData()


assert.deepStrictEqual(generator.next(), {value: 1, done: false})
assert.deepStrictEqual(generator.next(), {value: 2, done: false})
assert.deepStrictEqual(generator.next(), {value: 3, done: false})
assert.deepStrictEqual(generator.next(), {value: `ok`, done: false})
assert.deepStrictEqual(generator.next(), {value: 'end', done: false})
assert.deepStrictEqual(generator.next(), {value: undefined, done: true})

assert.deepStrictEqual(Array.from(streamData()), [1,2,3,`ok`,`end`])
assert.deepStrictEqual([...streamData()], [1,2,3,`ok`,`end`])


 function* promisified(){
   yield readFile(__filename)
   yield Promise.resolve(`Heey`)
} 

//Promise.all([...promisified()]).then(results => console.log(results))


async function* systemInfo(){
    const file = await readFile(__filename)
    yield {file}
    const {size} = await stat(__filename)
    yield {size}
    const dir = await readdir(__dirname)
    yield {dir}
}

;(async()=>{
  for await (const info of systemInfo()){
    console.log(info)
  }
})()

