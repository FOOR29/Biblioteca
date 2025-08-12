// se encarga de cargar los libros a la base de datos
// se encargara de llamar a los loads osea a los carga_usuarios etc...
import fs from 'fs'; // libreria que te permite leer archivos
import path from 'path';  // esta muesttra la ruta actual
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // traemos el pool de conexion db

export async function cargarLibrosAlaDataBase() {
    const rutaArchivo = path.resolve('server/data/02_libros.csv')  // aca indicamos la direccion del archivo libros csv
    const libros = []; // una lista vacia donde se van almacenar los datos   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(rutaArchivo)  //fs dice: vamos a leer un nuevo archivo en este el de la variable ruaarchivo
        .pipe(csv()) // le estamos diciend que ese archivo es un csv

        // esto se encarga de llena la lista de arriba 'libros' el hace un arrays de arrays
        .on('data', (fila) => {
            libros.push([
                fila.isbn,
                fila.titulo,
                fila.anio_de_publicacion,
                fila.autor
            ]);
        })

        // esto es opcional solo es para validr si se cargo o no
        .on('end', async () => {
            try {
                const sql = 'INSERT INTO libros (isbn,titulo,anio_de_publicacion,autor) VALUES ?';
                const [result] = await pool.query(sql, [libros]);

                console.log(`✅ Se insertaron ${result.affectedRows} libros.`);
                resolve(); // Termina exitosamente
            } catch (error) {
                console.error('❌ Error al insertar libros:', error.message);
                reject(error);
            }
        })

        .on('error', (err) => {
            console.error('error al leer el archivo de csv libros', err.message)  // el err.message es para que te diga el error especificamente
            rejetc(err)
        });

    })
}
