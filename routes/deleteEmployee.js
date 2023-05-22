const express = require('express');
const db = require('../database/db');
const router = express.Router();


router.delete('/:id', (req, res) => {
    const jobId = req.params.id;
    //console.log(jobId)
    const sql = 'DELETE FROM employee WHERE id = ?'
    db.query(sql, jobId, (err, result) => {
        if (err) {
            console.log('error:', err)
            res.status(500).json({
                message: "Failed to Delete employee info",
            });

        }
        else if (result.affectedRows === 0) {
            res.status(404).json({
                message: 'Employee not found',
            });
        }
        else {
            res.status(200).json({
                message: 'Deleted data successfully',
            });
        }
    });
});

module.exports = router;