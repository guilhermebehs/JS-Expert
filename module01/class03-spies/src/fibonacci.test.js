const {createSandbox} = require('sinon')
const assert = require('assert')
const Fibonacci = require('./fibonacci')
const sinon = createSandbox()


const fibonacci = new Fibonacci()

;(async()=>{

    {
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        const results = [...fibonacci.execute(4)]
        assert.deepStrictEqual(results,[0,1,1,2])

        const expectedCallCount = 5
        assert.strictEqual(spy.callCount, expectedCallCount)

        const {args:args0} = spy.getCall(0)
        assert.deepStrictEqual(args0, [4])

        const {args:args1} = spy.getCall(1)
        assert.deepStrictEqual(args1, [3, 1, 1])

        const {args:args2} = spy.getCall(2)
        assert.deepStrictEqual(args2, [2, 1, 2])

        const {args:args3} = spy.getCall(3)
        assert.deepStrictEqual(args3, [1, 2, 3])

        const {args:args4} = spy.getCall(4)
        assert.deepStrictEqual(args4, [0, 3, 5])
      
    }
})()