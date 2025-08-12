// se encargara de llamar a los loads osea a los carga_usuarios etc...

import { cargarUsuariosAlaDataBase } from "./carga_usuarios.js"  //siempr colocar el .js

(async () => {
     try {
          console.log('iniciando seeders...')

          await cargarUsuariosAlaDataBase()
          // await cargaLibrosAlaDataBase()  //falta crearla
          // await cargaPrestamosAlaDataBase() // falta crearla

          console.log('Todos los seeders ejecutados correctamente')
     } catch (error) {
          console.error('Error ejecutando los seeders', error.message)
     } finally {
          process.exit();
     }
})();

