const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.get('/');
loginRoute.post('/', loginController.login);
loginRoute.put('/');
loginRoute.delete('/');