const express = require('express');
const db = require('../database/db');
const router = express.Router();


router.put('/:id', (req, res) => {
    const jobId = req.params.id;
    const { name, position, contactNumber, department } = req.body;
    const sql =
        'UPDATE employee SET name = ? , position = ? , contactNumber = ? , department = ? WHERE id = ?';
    const values = [name, position, contactNumber, department, jobId];    
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Failed to update employee info",
            });

        }
         else if (result.affectedRows === 0) {
            res.status(404).json({
                message: 'Employee not found',
            });
        } 
        else if (result.changedRows === 0) {
            res.status(200).json({
                message: 'already updated profile',
            });
        }
        else {
            res.status(200).json({
                message : 'updated data successfully',
            });
        }
    });
});

module.exports = router;