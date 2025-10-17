import pool from '../../infrastucture/mysqlPool.js';

export default class MysqlProductRepository {
    async create({ sku, name, price_cents, stock }) {
        const [result] = await pool.execute(
            `INSERT INTO products (sku, name, price_cents, stock) VALUES (?, ?, ?, ?)`,
            [sku, name, price_cents, stock]
        );
        const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [result.insertId]);
        return rows[0];
    }

    async update(id, data) {
        const fields = [];
        const values = [];
        for (const [key, val] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(val);
        }
        if (!fields.length) return this.getById(id);
        values.push(id);
        await pool.execute(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
        return this.getById(id);
    }

    async getById(id) {
        const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
        return rows[0] || null;
    }
}
