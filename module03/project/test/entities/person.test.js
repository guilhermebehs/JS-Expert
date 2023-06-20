import {describe, it} from 'mocha'
import {expect} from 'chai'
import Person from '../../src/entities/person.js'

describe('Person', ()=>{
    it('should return a person instance from a string', ()=>{
        const person = Person.generateInstanceFromString(
            '1 Bike,Car 20000 2020-01-01 2020-01-05'
        )

        const expected = {
            from: '2020-01-01',
            to: '2020-01-05',
            id: '1',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000'
        }

        expect(person).to.deep.eq(expected)
    })

    it('should format values', ()=>{
        const person = new Person({
            from: '2020-01-01',
            to: '2020-01-05',
            id: '1',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000'
        })

        const result = person.formatted('pt-BR')
        const expected = {
            from: '01 de janeiro de 2020',
            to: '05 de janeiro de 2020',
            id: 1,
            vehicles: 'Bike e Car',
            kmTraveled: '20.000 km'
        }

        expect(result).to.deep.eq(expected)
    })
})