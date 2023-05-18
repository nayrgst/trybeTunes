const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middlewareError = require('../middlewares/middlewareError');
const loginRoute = require('../routes/loginRoute');
const registerRoute = require('../routes/registerRoute');

const app = express();
app.use(express.json());

app.use(cors());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use(middlewareError);

module.exports = app;