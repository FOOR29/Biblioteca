import mysql from "mysql2/promise"  //esto debe ir si o si

/// un pool es un sistema que le permite crear muchas conexxions

//con esto ya tenemos la conexion
export const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    password: "Qwe.123*", //cambiar la clave no se te olvide
    database: "mi_base",
    user: "root",
    connectionLimit: 10, // max numero de conexiones activas al mismo tiempo
    waitForConnections: true, // si se alcaza el limite, las nuevas peticiones
    queueLimit: 0  // numero max de peticiones en espera (0 = sin limite)
})

async function probarLaConexionConLaBaseDeDatos() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexion a la dbs exitosa')
        connection.release
    } catch (error) {
        console.error('Error al conecar a la data base')
    }
}

probarLaConexionConLaBaseDeDatos();  //lo pruebas en la terminal con el comando node y la ruta ej: node server/conexion_db.js


