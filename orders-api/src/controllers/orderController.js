import MysqlOrderRepository from '../adapters/repositories/mysqlOrderRepository.js';
import MysqlProductRepository from '../adapters/repositories/mysqlProductRepository.js';
import MysqlIdempotencyRepository from '../adapters/repositories/mysqlIdempotencyRepository.js';

import makeCreateOrder from '../usecases/orders/createOrder.js';
import makeGetOrderById from '../usecases/orders/getOrderById.js';
import makeListOrders from '../usecases/orders/listOrders.js';
import makeConfirmOrder from '../usecases/orders/confirmOrder.js';
import makeCancelOrder from '../usecases/orders/cancelOrder.js';

const orderRepository = new MysqlOrderRepository();
const productRepository = new MysqlProductRepository();
const idempotencyRepository = new MysqlIdempotencyRepository();

const createOrder = makeCreateOrder({ orderRepository, productRepository });
const getOrderById = makeGetOrderById({ orderRepository });
const listOrders = makeListOrders({ orderRepository });
const confirmOrder = makeConfirmOrder({ orderRepository, idempotencyRepository });
const cancelOrder = makeCancelOrder({ orderRepository });

export default {
  async create(req, res, next) {
    try {
      const order = await createOrder(req.body);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const order = await getOrderById(Number(req.params.id));
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const orders = await listOrders(req.query);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  async confirm(req, res, next) {
    try {
      const key = req.headers['x-idempotency-key'];
      const order = await confirmOrder(Number(req.params.id), key);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  async cancel(req, res, next) {
    try {
      const order = await cancelOrder(Number(req.params.id));
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
};
