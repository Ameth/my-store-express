// Poder capturar un middleware de tipo error y mostrarlo por consola
const logErrors = (err, req, res, next) => {
  console.log('Ejecutando middleware logErrors');
  //   console.error(err);
  // si no le mandamos ningun parámetros a next, next(), le estamos indicando que es un middleware normal, que continue al siguiente
  // sino, le enviamos en error en la función y sabe que es un middleware de tipo error y lo ejecutará al siguiente middleware de tipo error
  next(err);
};

// Para poder manejar todos los errores en todos los servicios con un mismo estandar, y no manejar uno por uno
// Para que express sepa que es un middleware de tipo error, deben ir los 4 parámetros obligatoriamente, no importa si no se utilizan todos
const errorHandler = (err, req, res, next) => {
  console.log('Ejecutando middleware errorHandler');
  res.status(500).json({
    message: err.message, // mostrar el mensaje del error
    stack: err.stack, // mostrar el detalle del error
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
