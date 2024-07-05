const db = require('../db/db');
const fs = require('fs'); // libreria para manejo de archivos
const path = require('path'); // libreria para manejo de rutas

const getAllPaises = (req, res) => {
    const sql = `SELECT ps.id, ps.pais, ps.idioma, ps.atel FROM paises ps`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener pais:', err);
            res.status(500).json({ error: 'Error al obtener pais' });
            return;
        }
        res.json(results);
    });
};

const getpaisImage = (req, res) => { // solucion problema imagen
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

const getPaisById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM paises WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener paises:', err);
            res.status(500).json({ error: 'Error al obtener paises' });
            return;
        }
        if(results.length == 0) {
            res.status(404).json({ error: 'Creador no encontrado' });
            return;
        }
        res.json(results);
    });
};

const createPais = (req, res) => {
    const { pais, idioma, atel } = req.body;
   
    const sql = 'INSERT INTO paises ( pais, idioma, atel) VALUES (? ,?, ?)';
    db.query(sql, [pais,idioma, atel], (err, results) => {
        if (err) {
            console.error('Error al crear pais:', err);
            res.status(500).json({ error: 'Error al crear pais' });
            return;
        }
        res.json({ message: 'Pais created', paisId: results.insertId });
    });
};

const updatePais = (req, res) => {
    const { id } = req.params;
    const { pais, idioma, atel } = req.body;
    
    const sql = 'UPDATE paises SET pais = ?, idioma = ?, atel = ? WHERE id = ?';
    db.query(sql, [pais, idioma, atel, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar pais:', err);
            res.status(500).json({ error: 'Error al actualizar pais' });
            return;
        }
        res.json({ message: 'Paises updated' });
    });
};

const deletePais = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM paises WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar paises:', err);
            res.status(500).json({ error: 'Error al eliminar paises' });
            return;
        }
        res.json({ message: 'Paises deleted' });
    });
};

module.exports = {
    getAllPaises,
    getPaisById,
    createPais,
    updatePais,
    deletePais,
    getpaisImage
  
  
};
