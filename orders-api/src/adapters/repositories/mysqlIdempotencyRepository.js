import pool from '../../infrastucture/mysqlPool.js';

export default class MysqlIdempotencyRepository {
    async findByKey(key) {
        const [rows] = await pool.query(`SELECT * FROM idempotency_keys WHERE idempotency_key = ?`, [key]);
        return rows[0] || null;
    }

    async save(record) {
        await pool.execute(
            `INSERT INTO idempotency_keys (idempotency_key, target_type, target_id, status, response_body)
       VALUES (?, ?, ?, ?, ?)`,
            [record.key, record.target_type, record.target_id, record.status, record.response_body]
        );
    }
}
