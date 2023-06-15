'use strict';

const {watch, promises:{readFile}} = require('fs')


class File {
        watch(event,filename){
              console.log('arguments', arguments)
              console.log('arguments as array', Array.prototype.slice.call(arguments))
              this.showContent(filename)
        }

        async showContent(filename){
         console.log((await readFile(filename)).toString())
        }
}

const file = new File()

//assim ele herda o this this do watch e ignora o this do file!!
//watch(__filename, file.watch)

//forma feia!!
//watch(__filename, (event, filename)=> file.watch(filename))

//forma ideial!!
//watch(__filename, file.watch.bind(file))

//chamam o método de um objeto mudando o comportamento dele. A diferença dos dois é que
//o apply chama os parametros com array
file.watch.call({showContent: (arg)=> console.log(`Called with ${arg}`)},null, 'teste')
file.watch.apply({showContent: (arg)=> console.log(`Called with ${arg}`)},[null, 'teste'])

