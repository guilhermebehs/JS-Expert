console.log(1 == "1")
console.log(1 === "1")
console.log(true - 2)
console.log(true + 2)
console.log('hello' || 1)
console.log(0 || 1)
console.log('hello' || 0)
console.log('hello' ?? 1)
console.log(0 ?? 1)
console.log('hello' ?? 0)
console.log('hello' && 3)
console.log(0 && 1)
console.log('hello' && 0)


const data = {
    name:'Guilherme Behs',
    age: 30,
    //string: 1 se nao for primitivo, chama o valueOf primeiro
    toString(){
        return `My name is ${this.name} and i'm ${this.age} years old`
    },
    //number: 1 se nao for primitivo, chama o toString
    valueOf(){
        return 10
    },
}
//vai no valueOf primeiro
console.log(data + 2)
//vai no valueOf primeiro
console.log(data + '2')
//toString
console.log(String(data))
//valueOf
console.log(Number(data))


const data2 = {
    name:'Guilherme Behs',
    age: 30,
    //string: 1 se nao for primitivo, chama o valueOf primeiro
    toString(){
        return `My name is ${this.name} and i'm ${this.age} years old`
    },
    //number: 1 se nao for primitivo, chama o toString
    valueOf(){
        return 10
    },
    //é o prioritario, ignora os demais
    [Symbol.toPrimitive](coercionType){
        const types = {
            string: JSON.stringify(this),
            number: 10
        }

        return types[coercionType] || types.string
    }
}

console.log(Number(data2))
console.log(String(data2))
console.log(new Date(data2))
console.log(data2 + 10)
console.log(data2 * 10)
console.log('Ok,'.concat(data2))
console.log('{"name":"Guilherme Behs","age":30}' == data2)

const data3 = {...data2, name: 'Zé'}

console.log(String(data3))

const withCreate = Object.create(data2) 
console.log(withCreate + '2')

const withAssign = Object.assign({},data2) 
console.log(withAssign + 2)