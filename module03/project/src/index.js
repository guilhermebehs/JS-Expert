import database from './../database.json' assert{type: 'json'}
import { save } from "./repository.js";
import Person from "./entities/person.js";
import { TerminalController } from './controllers/terminalController.js';
import { TableProvider } from './providers/tableProvider.js';

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController(new TableProvider())
terminalController.initializeTerminal(database, DEFAULT_LANG)


async function mainLoop(){
    try{
        const answer = await terminalController.question('data?')
        if(answer === STOP_TERM){
           console.log('closing terminal')
           terminalController.closeTerminal()
           return
        }
        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        mainLoop()
    }
    catch(e){
        console.log('Deu ruim', e)
        return mainLoop()
    }
}

await mainLoop()