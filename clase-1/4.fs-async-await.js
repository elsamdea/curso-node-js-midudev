// Esto sólo en los módulos nativos
// que no tienen promesas nativas
// las promesas evitan el uso de callbacks

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const { readFile } = require('node:fs/promises')

async function init () {
  console.log('Leyendo el primer archivo...')
  const text = await readFile('./archivo.txt', 'utf-8') // <-- hasta que no se resuelva, no pasa al siguiente
  console.log('primer texto:', text)
  console.log('--> Hacer cosas mientras lee el archivo...')
  
  console.log('Leyendo el segundo archivo...')
  const secondText = await readFile('./archivo2.txt', 'utf-8') // <-- se lee una vez que se ha acabado de leer el anterior
  console.log('segundo texto:', secondText)    
}

init()

// IIFE - Inmediatly Invoked Function Expression
// ;(
//   async () => {
//     console.log('Leyendo el primer archivo...')
//     const text = await readFile('./archivo.txt', 'utf-8')
//     console.log('primer texto:', text)
//     console.log('--> Hacer cosas mientras lee el archivo...')
    
//     console.log('Leyendo el segundo archivo...')
//     const secondText = await readFile('./archivo2.txt', 'utf-8')
//     console.log('segundo texto:', secondText)    
//   }
// )()

