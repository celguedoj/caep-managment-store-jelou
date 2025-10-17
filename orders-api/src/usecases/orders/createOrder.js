import axios from 'axios';
import config from '../../config/index.js';
import { orderSchema } from '../../domain/schemas/orderSchema.js';

export default function makeCreateOrder({ orderRepository, productRepository }) {
    return async function createOrder(data) {
        const parsed = orderSchema.parse(data);

        const res = await axios.get(
            `${config.customerAPI.url}/internal/customers/${parsed.customer_id}`,
            { headers: { Authorization: `Bearer ${config.serviceToken}` } }
        );
        if (res.status !== 200) throw new Error('Customer validation failed');

        let total = 0;
        const products = [];
        for (const item of parsed.items) {
            const product = await productRepository.getById(item.product_id);
            if (!product) throw new Error(`Product ${item.product_id} not found`);
            if (product.stock < item.qty)
                throw new Error(`Insufficient stock for product ${product.id}`);

            const subtotal = product.price_cents * item.qty;
            total += subtotal;
            products.push({ ...product, qty: item.qty, subtotal });
        }

        // Crear orden (transacción)
        const order = await orderRepository.create(parsed.customer_id, total, products);
        return order;
    };
}
