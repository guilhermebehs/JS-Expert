const {readFile} = require('fs/promises')
const constants = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File{
 static async csvToJSON(filePath){
    const content = await readFile(filePath, "utf8")
    this.isValid(content)

    return this.parse(content)
  }

  static isValid(csvString, options=DEFAULT_OPTIONS){
    const [headers, ...fileWithoutReader] = csvString.split(/\r?\n/)

    if(headers !== options.fields.join(',')) 
       throw new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE) 

    if(!fileWithoutReader.length || fileWithoutReader?.length > options.maxLines)
       throw new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
    
  }

  static parse(csv){
    const lines = csv.split(/\r?\n/)
    const firstLine = lines.shift()
    const header = firstLine.split(',')

    const users = lines.map(line =>{
        const columns = line.split(',')
        const user = {}
        for(const index in columns){
            user[header[index]] = columns[index].trim()
        }
        return user
    })
    return users
     
  }

}

module.exports = File