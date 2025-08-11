// se encarga de cargar los usuarios a la base de datos
// se encargara de llamar a los loads osea a los carga_usuarios etc...
import fs from 'fs'; // libreria que te permite leer archivos
import path from 'path';  // esta muesttra la ruta actual
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // traemos el pool de conexion db

export async function cargarUsuariosAlaDataBase() {
    const rutaArchivo = path.resolve('server/data/01_usuarios.csv')  // aca indicamos la direccion del archivo usuarios csv
    const usuarios = []; // una lista vacia donde se van almacenar los datos   

    return new promesa ((resolve, rejetc) =>{
        fs.createReadStream(rutaArchivo)  //fs dice: vamos a leer un nuevo archivo en este el de la variable ruaarchivo
        .pipe(csv()) // le estamos diciend que ese archivo es un csv

        // esto se encarga de llena la lista de arriba 'usuarios' el hace un arrays de arrays
        .on('data', (usuario) => {
            usuarios.push([
                usuario.id_usuario,
                usuario.nombre_completo.trim(),
                usuario.identificacion,
                usuario.correo,
                usuario.telefono
            ]);
        })

        // esto es opcional solo es para validr si se cargo o no
        .on('end', async () => {
            try {
                const sql = 'INSERT INTO usuarios (id_usuario,nombre_completo,identificacion,correo,telefono) VALUES ?';
                const [result] = await pool.query(sql, [usuarios]);

                console.log(`✅ Se insertaron ${result.affectedRows} autores.`);
                resolve(); // Termina exitosamente
            } catch (error) {
                console.error('❌ Error al insertar usuarios:', error.message);
                reject(error);
            }
        })

        .on('error', (err) => {
            console.error('error al leer el archivo de csv usuarios', err.message)  // el err.message es para que te diga el error especificamente
            rejetc(err)
        });

    })
}
