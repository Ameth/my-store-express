const express = require('express');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;
const ip = 'http://localhost';

// Para poder recibir datos de tipo json en el body de las peticiones POST
app.use(express.json());

// Middleware para poder controlar los CORS
// Generamos una lista de los dominios permitidos para la conexión
const whiteList = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://myapp.com',
  'http://127.0.0.1:5500',
];

// Pasamos un objeto de opciones a la configuración del los cors
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
// app.use(cors()); // Así permite a cualquier origen
app.use(cors(options));

// No es necesario indicar el index.js luego de la ruta, ya se sobreentiende
const routerApi = require('./routes/');

app.get('/', (request, response) => {
  response.send('Hola mi servidro en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta, o endpoint');
});

routerApi(app);

// Los middlewares de tipo error deben utilizarse despues del routing, es obligatorio
// El orden en el que los pongamos es el orden en el que se ejecutarán uno tras el otro, por lo que es importante saber ubicarlos
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // No deberia mostrar logs en modo de producción
  console.log('Servidor corriendo en ' + ip + ':' + port);
});
