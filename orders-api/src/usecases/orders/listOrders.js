import { listSchema } from '../../domain/schemas/orderSchema.js';

export default function makeListOrders({ orderRepository }) {
    return async function listOrders(query) {
        const queryParsed = listSchema.parse(query);
        return await orderRepository.list(queryParsed);
    };
}
