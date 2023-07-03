const Event = require('events')


const event = new Event()

const eventName = 'some event'

event.on(eventName, (msg)=> console.log(msg))

const obj = {
    counter: 0
}

//intercepta objetos
const proxy = new Proxy(obj, {
    set: (target, propertyKey, newValue)=>{
        event.emit(eventName, {newValue})
        target[propertyKey] = newValue
        return true
    },
    get:(object, prop)=> object[prop]
})


setInterval(function(){
   proxy.counter += 1
   console.log('executado pelo setInterval')
   if(proxy.counter === 10) clearInterval(this)
}, 200) 

setTimeout(()=>{
   proxy.counter += 1
   console.log('executado pelo setTimeout')
}, 100)

setImmediate(()=>{
    proxy.counter += 1
    console.log('executado pelo setImmediate')
})

//chama antes dos demais timers
process.nextTick(()=>{
    proxy.counter +=1
    console.log('executado pelo nextTick')
})