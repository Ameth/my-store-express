const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService(10);

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy filter');
});

// Las funciones que se ejecutan en las rutas son middlewares en sí, y podemos agregar tantos middlewares como queramos. Solo es separalos con coma
// Cada middleware debe tener el next() para que ejecute el siguiente, sino se queda allí
// Si tienen un next(error), se va a los middlewares de tipo error y los ejecutará según sea el caso
router.get(
  '/:id',
  // Este función captura el schema que le pasamos y en donde buscar los datos, y retorna a su vez un middleware que ya valida con Joi los datos
  // Si el middleware genera un error, se va a los middleware de errores, sino, continua con el siguiente que es ya la consulta de los datos
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
      // res.json(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: product,
    });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const update = await service.update(id, body);
      res.status(201).json({
        message: 'update',
        data: update,
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id);
    res.status(200).json({
      message: 'delete',
      id: deleted,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
