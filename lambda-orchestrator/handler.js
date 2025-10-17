import { getCustomerById } from './src/services/customersApi.js';
import { createOrder, confirmOrder } from './src/services/ordersApi.js';

export const handler = async (event) => {
    try {
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { customer_id, items, idempotency_key, correlation_id } = body;

        if (!customer_id || !items || !Array.isArray(items) || !idempotency_key) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Missing required fields: customer_id, items[], idempotency_key',
                }),
            };
        }

        const customer = await getCustomerById(customer_id);
        if (!customer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ success: false, message: 'Customer not found' }),
            };
        }

        const orderCreated = await createOrder({ customer_id, items });

        const orderConfirmed = await confirmOrder(orderCreated.id, idempotency_key);

        return {
            statusCode: 201,
            body: JSON.stringify({
                success: true,
                correlationId: correlation_id || null,
                data: {
                    customer,
                    order: orderConfirmed,
                },
            }),
        };
    } catch (err) {
        console.error('Error in orchestrator lambda:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: err.message || 'Internal server error',
            }),
        };
    }
};
