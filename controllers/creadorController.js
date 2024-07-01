const db = require('../db/db');
const fs = require('fs'); // libreria para manejo de archivos
const path = require('path'); // libreria para manejo de rutas

const getAllCreadores = (req, res) => {
    const sql = `SELECT * FROM creadores cr 
    INNER JOIN paises ps ON cr.pais = ps.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener diseñador:', err);
            res.status(500).json({ error: 'Error al obtener diseñadores' });
            return;
        }
        res.json(results);
    });
};

const getcreadorImage = (req, res) => { // solucion problema imagen
    const imageId = req.params.id; // requerimos id de imagen
    const parentDir = path.dirname(__dirname); // requerimos carpeta anterior a controller
    const imagePath = path.join(parentDir, '/uploads', imageId); // path de la imagen a buscar
    // Leer el archivo de imagen
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            res.status(500).send('Error al leer la imagen');
        } else {
            // Determinar el tipo de contenido basándose en la extensión del archivo
            const ext = path.extname(imagePath).toLowerCase();
            let contentType = 'image/jpeg'; // Valor predeterminado
            switch (ext) {
                case '.png':
                contentType = 'image/png';
                break;
                case '.jpeg':
                case '.jpg':
                contentType = 'image/jpeg';
                break;
                case '.webp':
                contentType = 'image/webp';
                break;
            }
            // Establecer el tipo de contenido
            res.writeHead(200, { 'Content-Type': contentType }); // necesario para que el navegador sepa que es una imagen lo que estamos devolviendo
            // Enviar la imagen
            res.end(data);
        }
    });
};

const getCreadorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM creadores WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener creadores:', err);
            res.status(500).json({ error: 'Error al obtener creadores' });
            return;
        }
        if(results.length == 0) {
            res.status(404).json({ error: 'Creador no encontrado' });
            return;
        }
        res.json(results);
    });
};

const createCreador = (req, res) => {
    const { creador, domicilio, telefono, pais } = req.body;
   
    const sql = 'INSERT INTO creadores ( creador, domicilio, telefono, pais) VALUES (? ,?, ?, ?)';
    db.query(sql, [creador,domicilio, telefono, pais], (err, results) => {
        if (err) {
            console.error('Error al crear diseñador:', err);
            res.status(500).json({ error: 'Error al crear diseñador' });
            return;
        }
        res.json({ message: 'Creador created', cradorId: results.insertId });
    });
};

const updateCreador = (req, res) => {
    const { id } = req.params;
    const { creador, domicilio, telefono, pais } = req.body;
    const image = req.file ? req.file.path : null; // Asegúrate de que la variable image esté definida
    const sql = 'UPDATE creadores SET creador = ?, domicilio = ?, telefono = ?, pais = ?';
    db.query(sql, [creador, domicilio, telefono, pais, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar diseñador:', err);
            res.status(500).json({ error: 'Error al actualizar diseñador' });
            return;
        }
        res.json({ message: 'Cradores updated' });
    });
};

const deleteCreador = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM creadores WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar diseñadores:', err);
            res.status(500).json({ error: 'Error al eliminar diseñadores' });
            return;
        }
        res.json({ message: 'Creadores deleted' });
    });
};

module.exports = {
    getAllCreadores,
    getCreadorById,
    createCreador,
    updateCreador,
    deleteCreador,
    getcreadorImage
  
  
};
