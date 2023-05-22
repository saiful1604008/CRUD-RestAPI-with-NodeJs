const express = require('express');
const db = require('../database/db');
const router = express.Router();


router.get('/employee/:id', (req, res) => {
    const jobId = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?'
    db.query(sql, jobId, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Failed to retrive the employee info",
            });

        } else if (results.length === 0) {
            res.status(404).json({
                message: 'Employee not found',
            });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;