export default function makeGetOrderById({ orderRepository }) {
    return async function getOrderById(id) {
        const order = await orderRepository.getById(id);
        if (!order) {
            const err = new Error('Order not found');
            err.status = 404;
            throw err;
        }
        return order;
    };
}
