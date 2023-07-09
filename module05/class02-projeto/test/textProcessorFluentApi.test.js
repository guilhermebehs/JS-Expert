const {describe, it} = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentApi = require('../src/textProcessorFluentApi')
const valid = require('./mock/valid')


describe('TextProcessorFluentApi', ()=>{
    describe('build', ()=>{
        it('should return content', ()=>{

            const result = new TextProcessorFluentApi(valid)
            .build()

            expect(result).to.be.deep.eq(valid)
        })
    })
    describe('extractPeopleData', ()=>{
        it('should extract data', ()=>{
            const expected = [
                ['Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
                 'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
                ].join('\n'),

                ['Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
                 'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
                ].join('\n')
            ]

            const result = new TextProcessorFluentApi(valid)
            .extractPeopleData()
            .build()

            expect(result).to.be.deep.eq(expected)
        })
    })

    describe('putDataInColumns', ()=>{
        it('should put data in columns', ()=>{
            const data = [
                    ['Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
                     'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
                    ].join('\n'),
                ]

            const expected = [
                [
                'Xuxa da Silva', 
                ' brasileira', 
                ' casada', 
                ' CPF 235.743.420-12', 
                ' residente e \ndomiciliada a Rua dos bobos',
                ' zero', 
                ' bairro Alphaville', 
                ' São Paulo. '
                ],
            ]

            const result = new TextProcessorFluentApi(data)
            .putDataInColumns()
            .build()

            expect(result).to.be.deep.eq(expected)
        })
    })

        describe('removeSpaces', ()=>{
            it('should remove spaces', ()=>{
    
                const data = [
                    [
                    'Xuxa da Silva', 
                    ' brasileira', 
                    ' casada', 
                    ' CPF 235.743.420-12', 
                    ' residente e \ndomiciliada a Rua dos bobos',
                    ' zero', 
                    ' bairro Alphaville', 
                    ' São Paulo. '
                    ],
                ]

                const expected = [
                    [
                    'Xuxa da Silva', 
                    'brasileira', 
                    'casada', 
                    'CPF 235.743.420-12', 
                    'residente e \ndomiciliada a Rua dos bobos',
                    'zero', 
                    'bairro Alphaville', 
                    'São Paulo.'
                    ],
                ]
    
                const result = new TextProcessorFluentApi(data)
                .removeSpaces()
                .build()
    
                expect(result).to.be.deep.eq(expected)
            })    
    })
})