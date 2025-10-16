import express from 'express';
import controller from '../controllers/customerController.js';
import jwtAuth from '../middleware/jwtAuth.js';
import serviceTokenAuth from '../middleware/serviceTokenAuth.js';

const router = express.Router();

router.post('/customers', jwtAuth, controller.create);
router.get('/customers', jwtAuth, controller.list);
router.get('/customers/:id', jwtAuth, controller.get);
router.patch('/customers/:id', jwtAuth, controller.update);
router.delete('/customers/:id', jwtAuth, controller.delete);
router.get('/internal/customers/:id', serviceTokenAuth, controller.get);

export default router;
