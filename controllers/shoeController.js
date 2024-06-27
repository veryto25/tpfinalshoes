const db = require('../db/db');

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

const getShoeById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM shoes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener zapato:', err);
            res.status(500).json({ error: 'Error al obtener zapato' });
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
    deleteShoe
};
