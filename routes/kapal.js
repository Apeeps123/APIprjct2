const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Middleware for parsing the request body as JSON
router.use(express.json());

// Read All Kapal (GET)
router.get('/', (req, res) => {
    const query = `
        SELECT Kapal.nama_kapal, alat.nama_alat, dpi.luas, pemilik.nama_pemilik  
        FROM Kapal
        INNER JOIN alat ON Kapal.id_alat = alat.id_alat
        INNER JOIN dpi ON Kapal.id_dpi = dpi.id_dpi
        INNER JOIN pemilik ON Kapal.id_pemilik = pemilik.id_pemilik
    `;

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving Kapal data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Kapal data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Kapal', data: rows });
    });
});


// Create Kapal (POST)
router.post('/', [
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nama_kapal, id_pemilik, id_dpi, id_alat } = req.body;

    const data = {
        nama_kapal,
        id_pemilik,
        id_dpi,
        id_alat,
    };

    connection.query('INSERT INTO Kapal SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating Kapal:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Kapal created successfully');
        return res.status(201).json({ status: true, message: 'Kapal has been created!', data: result });
    });
});

// Update Kapal by ID (PUT)
router.put('/:id_kapal', [
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id_kapal = req.params.id_kapal;
    const { nama_kapal, id_pemilik, id_dpi, id_alat } = req.body;

    const data = {
        nama_kapal,
        id_pemilik,
        id_dpi,
        id_alat,
    };

    connection.query('UPDATE Kapal SET ? WHERE id_kapal = ?', [data, id_kapal], (err, result) => {
        if (err) {
            console.error('Error updating Kapal:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Kapal updated successfully');
        return res.status(200).json({ status: true, message: 'Kapal has been updated!', data: result });
    });
});

// Delete Kapal by ID (DELETE)
router.delete('/:id_kapal', (req, res) => {
    const id_kapal = req.params.id_kapal;

    connection.query('DELETE FROM Kapal WHERE id_kapal = ?', id_kapal, (err, result) => {
        if (err) {
            console.error('Error deleting Kapal:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Kapal deleted successfully');
        return res.status(200).json({ status: true, message: 'Kapal has been deleted!', data: result });
    });
});

module.exports = router;
