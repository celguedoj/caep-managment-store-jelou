export default function makeCancelOrder({ orderRepository }) {
    return async function cancelOrder(id) {
        const order = await orderRepository.getById(id);
        if (!order) throw new Error('Order not found');

        if (order.status === 'CANCELED') return order;

        await orderRepository.cancel(id);
        return await orderRepository.getById(id);
    };
}
