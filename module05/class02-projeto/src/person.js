const { evaluateRegex } = require("./util")

class Person {

    constructor([nome,
                nacionalidade,
                estadoCivil,
                documento,
                rua,
                numero,
                bairro,
                estado
            ])
            {

             const replaceSpaces = val =>{
                const exp = evaluateRegex(/^\s|\s$/g)
                return val.replace(exp, '')
             }

            const replaceDeclarativeWords = val =>{
                const exp = evaluateRegex(/cpf\s|bairro\s/gi)
                return val.replace(exp, '') 
            }

            const replaceRemoveDotsAndTraces = val =>{
                const exp = evaluateRegex(/[-\.]/g)
                return val.replace(exp, '') 
            }

            const formatStreet = val =>{
                const exp = evaluateRegex(/(?<=\sa\s).*$/g)
                return val.match(exp).join()
            }

            const formatFirstLetter = val =>{
                const exp = evaluateRegex(/^(\w{1})([a-zA-Z\s]+)$/g)
                return val.replace(exp,(fullMatch, group1, group2, index)=>{
                    return `${group1.toUpperCase()}${group2.toLowerCase()}`
                }) 
            }

            const cleanValue = (val, functions)=>{
                for(const func of functions)
                   val = func(val)
                
                return val
            }

             this.nome= cleanValue(nome,[replaceSpaces])
             this.nacionalidade= cleanValue(nacionalidade,[replaceSpaces, formatFirstLetter])
             this.estadoCivil= cleanValue(estadoCivil,[replaceSpaces, formatFirstLetter])
             this.documento=cleanValue(documento,[replaceSpaces,replaceDeclarativeWords,replaceRemoveDotsAndTraces])
             this.rua=cleanValue(rua,[replaceSpaces, formatStreet])
             this.numero=cleanValue(numero,[replaceSpaces])
             this.bairro=cleanValue(bairro,[replaceSpaces, replaceDeclarativeWords])
             this.estado=cleanValue(estado,[replaceSpaces,replaceDeclarativeWords,replaceRemoveDotsAndTraces])
            }


            
}

module.exports = Person