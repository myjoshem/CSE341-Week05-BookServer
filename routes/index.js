const routes = require('express').Router();
const myController = require('../controllers');

routes.get('/', myController.amazingFunction);

module.exports = routes;