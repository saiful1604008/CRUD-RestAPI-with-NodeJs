const express = require('express');
const mysql = require('./database/db');
const bodyParser = require('body-parser');
const createEmployeeRoute = require('./routes/createEmployee');
const getEmployeesRoute = require('./routes/getEmployees');
const getSingleEmployeeRoute = require('./routes/getEmployee');
const updateEmployeeRouter = require('./routes/updateEmployee');
const deleteEmployeeRouter = require('./routes/deleteEmployee');


const app = express();
const port = 3000;

// ---- middleware ----- 
app.use(bodyParser.json());
app.use(createEmployeeRoute);
app.use(getEmployeesRoute);
app.use(getSingleEmployeeRoute);
app.use(updateEmployeeRouter);
app.use(deleteEmployeeRouter);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


module.exports = app;

