const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Middleware for parsing the request body as JSON
router.use(express.json());

// Create DPI (POST)
router.post('/', [
    body('luas').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { luas } = req.body;

    const data = {
        luas,
    };

    connection.query('INSERT INTO DPI SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating DPI:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DPI created successfully');
        return res.status(201).json({ status: true, message: 'DPI has been created!', data: result });
    });
});

// Read All DPI (GET)
router.get('/', (req, res) => {
    connection.query('SELECT * FROM DPI', (err, rows) => {
        if (err) {
            console.error('Error retrieving DPI data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DPI data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data DPI', data: rows });
    });
});

// Update DPI by ID (PUT)
router.put('/:id_dpi', [
    body('luas').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id_dpi = req.params.id_dpi;
    const { luas } = req.body;

    const data = {
        luas,
    };

    connection.query('UPDATE DPI SET ? WHERE id_dpi = ?', [data, id_dpi], (err, result) => {
        if (err) {
            console.error('Error updating DPI:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DPI updated successfully');
        return res.status(200).json({ status: true, message: 'DPI has been updated!', data: result });
    });
});

// Delete DPI by ID (DELETE)
router.delete('/:id_dpi', (req, res) => {
    const id_dpi = req.params.id_dpi;

    connection.query('DELETE FROM DPI WHERE id_dpi = ?', id_dpi, (err, result) => {
        if (err) {
            console.error('Error deleting DPI:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DPI deleted successfully');
        return res.status(200).json({ status: true, message: 'DPI has been deleted!', data: result });
    });
});

module.exports = router;
