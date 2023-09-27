const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Create Alat (POST)
router.post('/', [
    body('nama_alat').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nama_alat } = req.body;

    const data = {
        nama_alat,
    };

    connection.query('INSERT INTO Alat SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating Alat:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Alat created successfully');
        return res.status(201).json({ status: true, message: 'Alat has been created!', data: result });
    });
});

// Read All Alat (GET)
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Alat', (err, rows) => {
        if (err) {
            console.error('Error retrieving Alat data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Alat data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Alat', data: rows });
    });
});

// Update Alat by ID (PUT)
router.put('/:id_alat', [
    body('nama_alat').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id_alat = req.params.id_alat;
    const { nama_alat } = req.body;

    const data = {
        nama_alat,
    };

    connection.query('UPDATE Alat SET ? WHERE id_alat = ?', [data, id_alat], (err, result) => {
        if (err) {
            console.error('Error updating Alat:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Alat updated successfully');
        return res.status(200).json({ status: true, message: 'Alat has been updated!', data: result });
    });
});

// Delete Alat by ID (DELETE)
router.delete('/:id_alat', (req, res) => {
    const id_alat = req.params.id_alat;

    connection.query('DELETE FROM Alat WHERE id_alat = ?', id_alat, (err, result) => {
        if (err) {
            console.error('Error deleting Alat:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Alat deleted successfully');
        return res.status(200).json({ status: true, message: 'Alat has been deleted!', data: result });
    });
});

module.exports = router;
