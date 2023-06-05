const assert = require('assert')

const obj = {}
const arr = []
const fn = ()=> {}

//internamente, objetos literais viram funcoes explicitas
//__proto__ é a referencia do objeto que possui as propriedades nele
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)
assert.deepStrictEqual(obj.__proto__, Object.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)
// no fim da herança todos herdam de null
assert.deepStrictEqual(obj.__proto__.__proto__, null)
assert.deepStrictEqual(arr.__proto__.__proto__.__proto__, null)
assert.deepStrictEqual(fn.__proto__.__proto__.__proto__, null)

function Employee(){}
Employee.prototype.salary = ()=> 100

function Supervisor(){}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = ()=> 5

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonues= ()=> 1.5

assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__.__proto__, Employee.prototype)

const manager = new Manager()

assert.deepEqual(manager.salary(), 100)
assert.deepEqual(manager.profitShare(), 5)
assert.deepEqual(manager.monthlyBonues(), 1.5)
assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)