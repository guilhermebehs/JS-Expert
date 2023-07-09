const {evaluateRegex} = require('./util')

class TextProcessorFluentApi {

    //atributo privado
    #content

    constructor(content){
        this.#content = content
    }

    build(){
        return this.#content
    }

    extractPeopleData(){
    /* 
     ?<= extrai os dados que virão depois desse grupo
     [contratado|contratante]  ou um ou outro, e flag 'i' pega tanto maiusculo quanto minusculo
     :\s{1} proura o caractere literal de dois pontos seguido de um espaço
     tudo acima fica dentro de parenteses pra dizer que vai pegar dali pra frente
     (?!s) negative look around, vai ignorar os contratantes do fim do doc (que tem só espaço)
     .*\n pega qualquer coisa atẽ o primeiro \n
     .*? non greety, esse ? faz ele parar na primeira ocorrencia, assim evitar ficar em loop
    
    */

        const exp = evaluateRegex(/(?<=[contratado|contratante]:\s{1})(?!\s)(.*\n.*?)$/gmi) 
        this.#content = this.#content.match(exp) 
        return this
    }

    putDataInColumns(){
        const exp = evaluateRegex(/,/g) 
        this.#content = this.#content.map(data => data.split(exp))
        return this
    }

    removeSpaces(){
        const exp = evaluateRegex(/^\s|\s$/g) 
        this.#content = this.#content.map(data => data.map(line=> line.replace(exp, '')))
        return this
    }




}

module.exports = TextProcessorFluentApi