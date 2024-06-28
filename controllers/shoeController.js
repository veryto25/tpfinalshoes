const db = require('../db/db');
const fs = require('fs'); // libreria para manejo de archivos
const path = require('path'); // libreria para manejo de rutas

const getAllShoes = (req, res) => {
    const sql = 'SELECT * FROM shoes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener zapatos:', err);
            res.status(500).json({ error: 'Error al obtener zapatos' });
            return;
        }
        res.json(results);
    });
};

const getShoeImage = (req, res) => { // solucion problema imagen
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


const getShoeById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM shoes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener zapato:', err);
            res.status(500).json({ error: 'Error al obtener zapato' });
            return;
        }
        if(results.length == 0) {
            res.status(404).json({ error: 'Zapato no encontrado' });
            return;
        }
        res.json(results);
    });
};

const createShoe = (req, res) => {
    const { modelo, creador, precio, cantidad, descripcion } = req.body;
    const image = req.file ? req.file.path : null; // Asegúrate de que la variable image esté definida
    const sql = 'INSERT INTO shoes (modelo, creador, precio, cantidad, descripcion, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [modelo, creador, precio, cantidad, descripcion, image], (err, results) => {
        if (err) {
            console.error('Error al crear zapato:', err);
            res.status(500).json({ error: 'Error al crear zapato' });
            return;
        }
        res.json({ message: 'Zapato created', shoeId: results.insertId });
    });
};

const updateShoe = (req, res) => {
    const { id } = req.params;
    const { modelo, creador, precio, cantidad, descripcion } = req.body;
    const image = req.file ? req.file.path : null; // Asegúrate de que la variable image esté definida
    const sql = 'UPDATE shoes SET modelo = ?, creador = ?, precio = ?, cantidad = ?, descripcion = ?, image = ?  WHERE id = ?';
    db.query(sql, [modelo, creador, precio, cantidad, descripcion, image, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar zapato:', err);
            res.status(500).json({ error: 'Error al actualizar zapato' });
            return;
        }
        res.json({ message: 'Shoes updated' });
    });
};

const deleteShoe = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM shoes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar zapatos:', err);
            res.status(500).json({ error: 'Error al eliminar zapatos' });
            return;
        }
        res.json({ message: 'Shoes deleted' });
    });
};

module.exports = {
    getAllShoes,
    getShoeById,
    createShoe,
    updateShoe,
    deleteShoe,
    getShoeImage
};
