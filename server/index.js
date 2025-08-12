// se necesita instalar express para esto

import express from "express"
import { pool } from "/home/forlanordonez/Escritorio/prueba_desempeño/Biblioteca/server/conexion_db.js"

const app = express()
app.use(express.json())  // la informacion que llegue por el body va ser en formato json

// el promise es para trabajar con funcones asincronas
app.get('/', async(request, response) => {  // por req entra la info y sale por response
    response.send('server online')
})  //colocamos una ruta, la ruta mdare

/**********/
// prestamos crud solo es de prestamos

//get ir y traer
app.get("/prestamos", async(request, response) => {
    // response.send('aca vamos a traer a todos los prestamos')
    try {
        const query = `
        select
        prestamos.id_prestamo as prestamo,
        usuarios.nombre_completo as usuario,
        libros.isbn,
        libros.titulo as libro,
        libros.autor
        from prestamos
        join usuarios on usuarios.id_usuario = prestamos.id_usuario
        join libros on libros.isbn=prestamos.isbn;
        `
        const [filas] = await pool.query(query) // me trae la info pr filas

        return response.json(filas)

    } catch (error) {
        console.log('Error: ', error.message)
        response.status(500).json({
            status: 'error',
            endpoint: request.originalUrl,
            method: request.method,
            message: error.message
        });
    }
})

// para taer uno solo por id
app.get('/prestamos/:id_prestamo', async (req, res) => {
    try {
        const { id_prestamo } = req.params

        const query = `
        SELECT 
            p.id_prestamo as prestamo,
            p.fecha_prestamo,
            p.fecha_devolucion,
            p.estado,
            u.nombre_completo AS usuario,
            l.isbn, 
            l.titulo AS libro
        FROM prestamos p
        LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
        LEFT JOIN libros l ON p.isbn = l.isbn WHERE p.id_prestamo = ?
        `
        const [filas] = await pool.query(query, id_prestamo)

        return res.json(filas[0]);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

//post para crear
app.post('/prestamos', async (req, res) => {
    try {
        const {
            id_usuario,
            isbn,
            fecha_prestamo,
            fecha_devolucion,
            estado
        } = req.body // recbimos las info del body

        const query = `
        INSERT INTO prestamos 
        (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado)
        VALUES (?, ?, ?, ?, ?)
        `
        const values = [
            id_usuario,
            isbn,
            fecha_prestamo,
            fecha_devolucion,
            estado
        ]

        const [result] = await pool.query(query, values)

        res.status(201).json({
            mensaje: "prestamo creado exitosamente"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})


//put para actuaizar un prstamo
app.put('/prestamos/:id_prestamo', async (req, res) => {
    try {
        const { id_prestamo } = req.params

        const {
            id_usuario,
            isbn,
            fecha_prestamo,
            fecha_devolucion,
            estado
        } = req.body

        const query = `
        UPDATE prestamos SET 
            id_usuario = ?,
            isbn = ?,
            fecha_prestamo = ?,
            fecha_devolucion = ?,
            estado = ?
        WHERE id_prestamo = ?
        `
        const values = [
            id_usuario,
            isbn,
            fecha_prestamo,
            fecha_devolucion,
            estado,
            id_prestamo
        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "prestamo actualizado" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})


//delete para elimminar

app.delete('/prestamos/:id_prestamo', async (req, res) => {
    try {
        const { id_prestamo } = req.params

        const query = `
        DELETE FROM prestamos WHERE id_prestamo = ?
        `
        const values = [
            id_prestamo
        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "prestamo eliminado" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
})



// eso va de ultimmo
app.listen(3000, () => {
    console.log('el servidor ya inicio y esta corriendo en http://localhost:3000')  // lo corres como: node server/index.js
})







