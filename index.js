const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;
const ip = 'http://localhost';

// Para poder recibir datos de tipo json en el body de las peticiones POST
app.use(express.json());

// No es necesario indicar el index.js luego de la ruta, ya se sobreentiende
const routerApi = require('./routes/');

app.get('/', (request, response) => {
  response.send('Hola mi servidro en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta, o endpoint');
});

routerApi(app);

app.listen(port, () => {
  // No deberia mostrar logs en modo de producción
  console.log('Servidor corriendo en ' + ip + ':' + port);
});
