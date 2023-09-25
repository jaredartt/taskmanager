// We can import routes here thanks to the Express function Router()
const routes = require('express').Router();
const controller = require('../controllers/homeController');

routes.get('/', controller.normalRoute);
routes.get('/jared', controller.JaredRoute);
routes.get('/ruben', controller.RubenRoute);
routes.get('/pedro', controller.PedroRoute);

module.exports = routes;