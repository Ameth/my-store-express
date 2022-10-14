const express = require('express');
const app = express();
const port = 3000;
const ip = 'http://localhost';

app.get('/', (request, response) => {
  response.send('Hola mi servidro en Express');
});

app.listen(port, () => {
  console.log('Servidor corriendo en ' + ip + ':' + port);
});
