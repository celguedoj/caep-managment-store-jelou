import pool from '../../infrastucture/mysqlPool.js';

export default class MysqlOrderRepository {
    async create(customerId, total, items) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const [res] = await conn.execute(
                `INSERT INTO orders (customer_id, total_cents, status) VALUES (?, ?, 'CREATED')`,
                [customerId, total]
            );
            const orderId = res.insertId;

            for (const item of items) {
                await conn.execute(
                    `INSERT INTO order_items (order_id, product_id, qty, unit_price_cents, subtotal_cents)
           VALUES (?, ?, ?, ?, ?)`,
                    [orderId, item.id, item.qty, item.price_cents, item.subtotal]
                );
                await conn.execute(
                    `UPDATE products SET stock = stock - ? WHERE id = ?`,
                    [item.qty, item.id]
                );
            }

            await conn.commit();
            const [rows] = await conn.query(`SELECT * FROM orders WHERE id = ?`, [orderId]);
            return rows[0];
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    async getById(id) {
        const [orders] = await pool.query(`SELECT * FROM orders WHERE id = ?`, [id]);
        if (!orders.length) return null;

        const [items] = await pool.query(
            `SELECT product_id, qty, unit_price_cents, subtotal_cents FROM order_items WHERE order_id = ?`,
            [id]
        );

        return { ...orders[0], items };
    }

    async list({ status, limit }) {
        const sql = status
            ? `SELECT * FROM orders WHERE status = ? ORDER BY id DESC LIMIT ?`
            : `SELECT * FROM orders ORDER BY id DESC LIMIT ?`;

        const params = status ? [status, limit] : [limit];
        const [rows] = await pool.query(sql, params);
        return rows;
    }

    async confirm(id) {
        await pool.execute(`UPDATE orders SET status = 'CONFIRMED' WHERE id = ?`, [id]);
    }

    async cancel(id) {
        await pool.execute(`UPDATE orders SET status = 'CANCELED' WHERE id = ?`, [id]);
    }
}
