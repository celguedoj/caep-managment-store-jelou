import MysqlProductRepository from '../adapters/repositories/mysqlProductRepository.js';

import makeCreateProduct from '../usecases/products/createProduct.js';
import makeUpdateProduct from '../usecases/products/updateProduct.js';
import makeGetProduct from '../usecases/products/getProduct.js';

const productRepository = new MysqlProductRepository();

const createProduct = makeCreateProduct({ productRepository });
const updateProduct = makeUpdateProduct({ productRepository });
const getProduct = makeGetProduct({ productRepository });

export default {
  async create(req, res, next) {
    try {
      const product = await createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const product = await updateProduct(Number(req.params.id), req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const product = await getProduct(Number(req.params.id));
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
};
