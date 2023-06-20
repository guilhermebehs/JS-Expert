import {describe, it, before} from 'mocha'
import sinonDefault from 'sinon'
import {expect} from 'chai'
import TerminalController from '../../src/controllers/terminalController.js'

const sinon = sinonDefault.createSandbox()



describe('TerminalController', ()=>{
    let tableProvider
    describe('initializeTerminal()',()=>{
        before(()=>{
            tableProvider = {
                initializeTerminal: ()=> {},
                closeTerminal: ()=> {},
                updateTable: ()=> {},
                question: ()=> {},
            }
        })
        afterEach(()=>{
            sinon.restore()
        })
        it('should initialize terminal', ()=>{
            const terminalController = new TerminalController(tableProvider)
            const spy = sinon.spy(tableProvider, tableProvider.initializeTerminal.name)
            expect(terminalController.initializeTerminal()).to.be.undefined
            expect(spy.calledOnce).to.be.true
        })
        it('should close terminal', ()=>{
            const terminalController = new TerminalController(tableProvider)
            const spy = sinon.spy(tableProvider, tableProvider.closeTerminal.name)
            expect(terminalController.closeTerminal()).to.be.undefined
            expect(spy.calledOnce).to.be.true
        })
        it('should update table', ()=>{
            const terminalController = new TerminalController(tableProvider)
            const spy = sinon.spy(tableProvider, tableProvider.updateTable.name)

            const item = {}

            expect(terminalController.updateTable(item)).to.be.undefined
            expect(terminalController.data.length).to.be.eq(1)
            expect(terminalController.data[0]).to.be.eq(item)
            expect(spy.calledOnce).to.be.true
            expect(spy.getCall(0).args).to.be.eql([terminalController.data])
        })
        it('should ask a question with given message', ()=>{
            const terminalController = new TerminalController(tableProvider)
            const spy = sinon.spy(tableProvider, tableProvider.question.name)
            expect(terminalController.question('some message')).to.be.undefined
            expect(spy.calledOnce).to.be.true
            expect(spy.getCall(0).args).to.be.eql(['some message'])
        })
        it('should ask a question with default message', ()=>{
            const terminalController = new TerminalController(tableProvider)
            const spy = sinon.spy(tableProvider, tableProvider.question.name)
            expect(terminalController.question()).to.be.undefined
            expect(spy.calledOnce).to.be.true
            expect(spy.getCall(0).args).to.be.eql([''])
        })
    })
})