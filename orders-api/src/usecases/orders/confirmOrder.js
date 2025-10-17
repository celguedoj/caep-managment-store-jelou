export default function makeConfirmOrder({ orderRepository, idempotencyRepository }) {
    return async function confirmOrder(id, idempotencyKey) {
        if (!idempotencyKey) {
            const err = new Error('Missing X-Idempotency-Key header');
            err.status = 400;
            throw err;
        }

        const existing = await idempotencyRepository.findByKey(idempotencyKey);

        if (existing) {
            if (existing.target_id === Number(id)) {
                return existing;
            } else {
                const err = new Error(
                    `Idempotency key already used for another order (target_id=${existing.target_id})`
                );
                err.status = 409;
                throw err;
            }
        }

        const order = await orderRepository.getById(id);
        if (!order) {
            const err = new Error('Order not found');
            err.status = 404;
            throw err;
        }

        if (order.status === 'CONFIRMED') return order;

        await orderRepository.confirm(id);
        const confirmed = await orderRepository.getById(id);

        await idempotencyRepository.save({
            key: idempotencyKey,
            target_type: 'ORDER',
            target_id: id,
            status: 'CONFIRMED',
            response_body: JSON.stringify(confirmed)
        });

        return confirmed;
    };
}
