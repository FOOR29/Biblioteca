// se encargara de llamar a los loads osea a los carga_usuarios etc...

import { cargarLibrosAlaDataBase } from "./carga_libros.js";
import { cargarPrestamosAlaDataBase } from "./carga_prestamos.js";
import { cargarUsuariosAlaDataBase } from "./carga_usuarios.js"  //siempr colocar el .js

(async () => {
     try {
          console.log('iniciando seeders...')

          await cargarUsuariosAlaDataBase()
          await cargarLibrosAlaDataBase()  //falta crearla
          await cargarPrestamosAlaDataBase() // falta crearla

          console.log('Todos los seeders ejecutados correctamente')
     } catch (error) {
          console.error('Error ejecutando los seeders', error.message)
     } finally {
          process.exit();
     }
})();

