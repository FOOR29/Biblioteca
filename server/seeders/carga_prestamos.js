// se encarga de cargar los prestamos a la base de datos
// se encargara de llamar a los loads osea a los carga_usuarios etc...
import fs from 'fs'; // libreria que te permite leer archivos
import path from 'path';  // esta muesttra la ruta actual
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // traemos el pool de conexion db

export async function cargarPrestamosAlaDataBase() {
    const rutaArchivo = path.resolve('server/data/03_prestamos.csv')  // aca indicamos la direccion del archivo prestamos csv
    const prestamos = []; // una lista vacia donde se van almacenar los datos   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(rutaArchivo)  //fs dice: vamos a leer un nuevo archivo en este el de la variable ruaarchivo
        .pipe(csv()) // le estamos diciend que ese archivo es un csv

        // esto se encarga de llena la lista de arriba 'prestamos' el hace un arrays de arrays
        .on('data', (fila) => {
            prestamos.push([
                fila.id_prestamo,
                fila.id_usuario,
                fila.isbn,
                fila.fecha_prestamo,
                fila.fecha_devolucion,
                fila.estado
            ]);
        })

        // esto es opcional solo es para validr si se cargo o no
        .on('end', async () => {
            try {
                const sql = 'INSERT INTO prestamos (id_prestamo,id_usuario,isbn,fecha_prestamo,fecha_devolucion,estado) VALUES ?';
                const [result] = await pool.query(sql, [prestamos]);

                console.log(`✅ Se insertaron ${result.affectedRows} prestamos.`);
                resolve(); // Termina exitosamente
            } catch (error) {
                console.error('❌ Error al insertar prestamos:', error.message);
                reject(error);
            }
        })

        .on('error', (err) => {
            console.error('error al leer el archivo de csv prestamos', err.message)  // el err.message es para que te diga el error especificamente
            rejetc(err)
        });

    })
}
