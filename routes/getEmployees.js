const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.get('/', (req,res)=> {
    const sql = 'SELECT * FROM employee'
    db.query(sql, (err, results)=> {
        if(err) {
            res.status(500).json({
                message: "Failed to retrive all the employees",
            });

        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;