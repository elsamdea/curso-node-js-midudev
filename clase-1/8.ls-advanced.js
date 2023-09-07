const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

// [2] posición es donde está el nombre
// ?? nullis colision operator instead of the False
// por defecto es el '.'

const folder = process.argv[2] ?? '.'

// nos está pasando la carpeta actual

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // status - información del archivo
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.bgMagenta(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)


// opción sencilla y más simple sin tanta info

// const fs = require('node:fs/promises)
// const folder = process.argv[2] ?? '.'
// creamos una función ls
// async function ls (directory) {
//   try{
//     const files = await fs.readdir(folder)  // el await provooca que la ejecución de esta función async se pause hasta que la Promise acabe o sea rechazada
//   } catch {
//     console.error(`No se pudo leer el directorio: S{folder}`)
//     process.exit(1)
//   }
// }

// creamos todas las promesas de todos los archivos
   // mapeamos cada archivo y recuperamos la info de todos los archivos

// const filesPromises = files.map(async file => {
//   const filePath = path.join(folder, file)
//   let stats
//   try {
//     const stats = await fs.stats(filePath) // status - info archivo
//   } catch {
//     console.error(`No se pudo leer el archivo${filePath}`)
//     process.exit(1)  // salida controlada
//   }
// }
  )


// fs.readdir(folder)
      // .then(files => {
      //   files.forEach(file => {
      //     const filePatch = path.join(folder, file) // ruta fichero al listar al leer el dir
      //     // recuperamos info de cada fichero
      //     fs.stat(filePatch)
        
      //   })
      // })
      // .catch(err => {
      //   if (err) {
      //     console.error('Error al leer el directorio: ', err)
      //     return;
      //   }
      // })

// ls(folder)