const express = require('express');
const db = require('../database/db');
const { generateToken } = require('../middleware/token');
const router = express.Router();
const crypto = require('crypto');

router.post('/', (req, res, next) => {
    const { username, password, id } = req.body;

    // Check if user exists in the database
    const sql = 'SELECT * FROM identity WHERE username = ?';
    const value = [username];
    db.query(sql, value, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Internal error",
            });
        }

        if (results.length > 0) {
            res.status(409).json({
                message: "User already exists",
            });
        } else {
            const secretKey = process.env.SECRET_KEY;
            const hashedPassword = crypto
                .createHmac('sha256', secretKey)
                .update(password)
                .digest('hex');

            // Insert user access info in MySQL db
            const query = 'INSERT INTO identity (username, password, id) VALUES (?, ?, ?)';
            const values = [username, hashedPassword, id];
            db.query(query, values, (err, results) => {
                if (err) {
                    res.status(400).json({
                        message: "Failed to signup user",
                    });
                } else {
                    req.body.username = username; // Pass the username to generateToken middleware
                    next(); // Proceed to generateToken middleware
                }
            });
        }
    });
}, generateToken, (req, res) => {
    const { token } = req;
    res.status(200).json({
        message: "User signup successful",
        token: token,
    });
});

module.exports = router;
