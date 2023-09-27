const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Middleware for parsing the request body as JSON
router.use(express.json());

// Create Pemilik (POST)
router.post('/', [
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nama_pemilik, alamat, no_hp } = req.body;

    const data = {
        nama_pemilik,
        alamat,
        no_hp,
    };

    connection.query('INSERT INTO Pemilik SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating Pemilik:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Pemilik created successfully');
        return res.status(201).json({ status: true, message: 'Pemilik has been created!', data: result });
    });
});

// Read All Pemilik (GET)
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Pemilik', (err, rows) => {
        if (err) {
            console.error('Error retrieving Pemilik data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Pemilik data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Pemilik', data: rows });
    });
});

// Update Pemilik by ID (PUT)
router.put('/:id_pemilik', [
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id_pemilik = req.params.id_pemilik;
    const { nama_pemilik, alamat, no_hp } = req.body;

    const data = {
        nama_pemilik,
        alamat,
        no_hp,
    };

    connection.query('UPDATE Pemilik SET ? WHERE id_pemilik = ?', [data, id_pemilik], (err, result) => {
        if (err) {
            console.error('Error updating Pemilik:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Pemilik updated successfully');
        return res.status(200).json({ status: true, message: 'Pemilik has been updated!', data: result });
    });
});

// Delete Pemilik by ID (DELETE)
router.delete('/:id_pemilik', (req, res) => {
    const id_pemilik = req.params.id_pemilik;

    connection.query('DELETE FROM Pemilik WHERE id_pemilik = ?', id_pemilik, (err, result) => {
        if (err) {
            console.error('Error deleting Pemilik:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Pemilik deleted successfully');
        return res.status(200).json({ status: true, message: 'Pemilik has been deleted!', data: result });
    });
});

module.exports = router;
