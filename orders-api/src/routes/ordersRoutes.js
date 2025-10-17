import express from 'express';
import jwtAuth from '../middleware/jwtAuth.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', jwtAuth, orderController.create);
router.get('/orders/:id', jwtAuth, orderController.get);
router.get('/orders', jwtAuth, orderController.list);
router.post('/orders/:id/confirm', jwtAuth, orderController.confirm);
router.post('/orders/:id/cancel', jwtAuth, orderController.cancel);

export default router;
