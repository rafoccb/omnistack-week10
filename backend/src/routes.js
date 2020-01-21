const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

// request = pega necessário do que foi enviado pelo cliente por exemplo
//response = envia de volta para

// Métodos HTTP: GET, POST PUT, DELETE
// QUery Params: req.query (Filtros, ordenação, paginação...)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
// routes.post('/devsupdate', DevController.update);

// rota busca
routes.get('/search', SearchController.index);
 
module.exports = routes;