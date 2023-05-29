const constants = require('./src/constants')
const File = require('./src/file')
const assert = require('assert')

;(async()=>{
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const error = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
    const promise = File.csvToJSON(filePath)
    await assert.rejects(promise, error)
  }
  {
    const filePath = './mocks/invalidHeader-invalid.csv'
    const error = new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE)
    const promise = File.csvToJSON(filePath)
    await assert.rejects(promise, error)
  }
  {
    const filePath = './mocks/fiveItems-invalid.csv'
    const error = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
    const promise = File.csvToJSON(filePath)
    await assert.rejects(promise, error)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const expected = [
        {
            id:1,
            name: 'some name 1',
            profession: 'developer',
            age: '20',
        },
        {
            id:2,
            name: 'some name 2',
            profession: 'manager',
            age: '30',
        },
        {
            id:3,
            name: 'some name 3',
            profession: 'pm',
            age: '25',
        }
    ]
    const result = await File.csvToJSON(filePath)
    await assert.deepEqual(result, expected)
  }
})()