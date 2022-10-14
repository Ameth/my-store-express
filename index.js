const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;
const ip = 'http://localhost';

const routerApi = require('./routes/');

app.get('/', (request, response) => {
  response.send('Hola mi servidro en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta, o endpoint');
});

routerApi(app);

app.listen(port, () => {
  console.log('Servidor corriendo en ' + ip + ':' + port);
});
