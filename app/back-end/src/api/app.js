const express = require('express');
const cors = require('cors');
const middlewareError = require('../middlewares/middlewareError');
const loginRoute = require('../routes/loginRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/login', loginRoute);
app.use(middlewareError);

module.exports = app;