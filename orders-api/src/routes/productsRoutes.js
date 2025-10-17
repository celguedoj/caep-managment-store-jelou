import express from 'express';
import jwtAuth from '../middleware/jwtAuth.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router.post('/products', jwtAuth, productController.create);
router.patch('/products/:id', jwtAuth, productController.update);
router.get('/products/:id', jwtAuth, productController.get);

export default router;
