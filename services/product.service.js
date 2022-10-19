const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor(size = 100) {
    this.products = [];
    this.generate(size);
  }

  generate(size) {
    const limit = size;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  find() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.products);
      }, 1000);
    });
    // return this.products;
  }

  async findOne(id) {
    const prod = this.products.find((item) => item.id === id);
    if (!prod) {
      throw boom.notFound('Product not found');
    }
    if (prod.isBlock) {
      throw boom.conflict('Product is block');
    }
    return prod;
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const prod = this.products[index];
    this.products[index] = {
      ...prod,
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index >= 0 && this.products.splice(index, 1)) {
      return id;
    } else {
      throw boom.notFound('Product not found');
    }
  }
}

module.exports = ProductService;
