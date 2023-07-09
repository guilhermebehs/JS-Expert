const {describe, it} = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('../src/util')

describe('Util', ()=>{
  describe('#evaluateRegex',()=>{
    it('should throw error', ()=>{
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        expect(()=> evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `this ${unsafeRegex} is unsafe`)
    })

    it('should not throw error', ()=>{
        const safeRegex = /^([a-z])$/
        expect(()=> evaluateRegex(safeRegex)).to.not.throw()
        expect(evaluateRegex(safeRegex)).to.be.ok
    })
  })  
    
})