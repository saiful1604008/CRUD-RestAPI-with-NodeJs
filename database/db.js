const mysql = require('mysql');

var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database: "dotlines",
});

conn.connect((err)=> {
    if(err) {
        throw err;
    } else console.log('MySQL database connected successfully')
});

module.exports = conn;