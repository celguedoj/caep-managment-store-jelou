import { httpClient } from '../utils/httpClient.js';

const ORDERS_API_URL = process.env.ORDERS_API_URL;
const SERVICE_JWT_TOKEN = process.env.SERVICE_JWT_TOKEN;

export async function createOrder(payload) {
    const res = await httpClient(`${ORDERS_API_URL}/orders`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${SERVICE_JWT_TOKEN}` },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Failed to create order (${res.status})`);
    return res.data;
}

export async function confirmOrder(orderId, idempotencyKey) {
    const res = await httpClient(`${ORDERS_API_URL}/orders/${orderId}/confirm`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${SERVICE_JWT_TOKEN}`,
            'X-Idempotency-Key': idempotencyKey,
        },
    });

    if (!res.ok) throw new Error(`Failed to confirm order (${res.status})`);
    return res.data;
}
