const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/:catId/productos/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    catId,
    prodId,
    name: 'Product 1',
    price: 1000,
  });
});

module.exports = router;
