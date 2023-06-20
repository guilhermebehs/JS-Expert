export default class TerminalController {

     
    constructor(tableProvider){
        this.tableProvider = tableProvider
        this.data = []
    }

    initializeTerminal(database,language){
       this.tableProvider.initializeTerminal(database,language)
    }

    closeTerminal(){
        this.tableProvider.closeTerminal()
    }
   
    updateTable(item){
        this.data.push(item)
        this.tableProvider.updateTable(this.data)
    }

    question(msg=''){
       return this.tableProvider.question(msg)
    }

    


}