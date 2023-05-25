const express = require('express');
const db = require('../database/db');
const router = express.Router();
const crypto = require('crypto');
const { verifyToken } = require('../middleware/token');

router.post('/', verifyToken, (req, res, next) => {
    const { username, password, id } = req.body;

    // check if the user exists in the database
    const sql = 'SELECT * FROM identity WHERE username = ?';
    const values = [username];
    console.log('login user:', username);
    db.query(sql, values, (err, results) => {
        if (err) {
            res.status(500).json({
                message: 'Internal error',
            });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({
                message: 'User not found',
            });
            return;
        }

        const user = results[0];
        console.log('user is', user)
        const secretKey = process.env.SECRET_KEY;
        const hashedPassword = crypto
            .createHmac('sha256', secretKey)
            .update(password)
            .digest('hex');

        if (parseInt(user.id) !== parseInt(id)) {
            console.log('2', user.id, '---', id);
            res.status(401).json({
                message: 'Invalid credentials.....',
            });
            return;
        }

        // User is authenticated only when the token is valid
        res.status(200).json({
            message: 'Login successful',
        });
    });
});

module.exports = router;
