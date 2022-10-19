const Joi = require('joi');

// Para hacer más practico la validación de cada campo, los dividimos en variables por separados, para luego meterlos en cada schema

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

// En cada schema agregamos validaciones propias de cada uno, por ejemplo, si es obligatorio
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
