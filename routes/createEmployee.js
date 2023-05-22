const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/employee', (req, res) => {
    const { id, name, position, contactNumber, department } = req.body;
    const sql =
        'INSERT INTO employee (id, name, position, contactNumber, department) VALUES (?, ? , ? , ?, ?)';
    const values = [id, name, position, contactNumber, department];

    //console.log(values);

    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Failed to create new employee",
            });
        } else {
            res.status(200).json({
                message: "Successfully created new user",
                values: result
            });
        }
    });
});

module.exports = router;