
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const app = express();
const { setupWebSocket } = require('./websocket');
const server = http.Server(app); //extrair o servidor http de dentro do express

setupWebSocket(server);


mongoose.connect('bancomongovaiaqui', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// app.use(cors({origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json()); 
app.use(routes);


server.listen(3333);
