const TextProcessorFluentApi = require('./textProcessorFluentApi')

class TextProcessorFacade{
    #textProcessorFluentApi

    constructor(text) {
        this.#textProcessorFluentApi = new TextProcessorFluentApi(text)
    }

    getPeopleFromPDF(){
        return this.#textProcessorFluentApi
               .extractPeopleData()
               .putDataInColumns()
               .removeSpaces()
               .createPerson()
               .build()
    }
}

module.exports = TextProcessorFacade