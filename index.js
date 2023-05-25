const express = require('express');
const mysql = require('./database/db');
const bodyParser = require('body-parser');
const createEmployeeRoute = require('./routes/createEmployee');
const getEmployeesRoute = require('./routes/getEmployees');
const getSingleEmployeeRoute = require('./routes/getEmployee');
const updateEmployeeRouter = require('./routes/updateEmployee');
const deleteEmployeeRouter = require('./routes/deleteEmployee');
const signupUserRouter = require('./routes/signupRoute');
const loginUserRouter = require('./routes/loginRoute');
const { generateToken, verifyToken } = require('./middleware/token');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const port = 3000;


app.use(bodyParser.json());


app.use('/employee', createEmployeeRoute);
app.use('/employees', getEmployeesRoute);
app.use('/employee', getSingleEmployeeRoute);
app.use('/employee', updateEmployeeRouter);
app.use('/employee', deleteEmployeeRouter);
app.use('/signup', generateToken, signupUserRouter);
app.use('/login', verifyToken, loginUserRouter);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


module.exports = app;