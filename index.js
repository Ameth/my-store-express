const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hola mi servidro en Express');
});

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto ' + port);
});
