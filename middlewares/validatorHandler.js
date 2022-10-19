const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {
  // Creamos un clousure para generar middlewares dinamicamente
  // Le indicamos que schema va a validar, y luego en donde la a buscar las propiedades a validar (body, params, query)
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); // abortEarly: false -> Para mostrar todos los errores de una sola vez
    if (error) {
      // Si hay un error en la validación, enviamos un error tipo boom con los datos del error
      next(boom.badRequest(error));
    } else {
      // Sino, seguimos ejecutando el siguiente middleware, que es el siguiente en la ruta
      next();
    }
  };
};

module.exports = validatorHandler;
