"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../../src/entities/person.js',{default(v){Person=v}},2);



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