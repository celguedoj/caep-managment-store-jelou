import pool from '../../infrastucture/mysqlPool.js';
import Customer from '../../domain/customer.js';

export default class MysqlCustomerRepository {
  constructor() { }

  async create({ name, email, phone }) {
    const [result] = await pool.execute(
      `INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`,
      [name, email, phone]
    );
    const id = result.insertId;
    return this.getById(id);
  }

  async getById(id) {
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, created_at, updated_at, deleted_at FROM customers WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
    if (rows.length === 0) return null;
    return new Customer(rows[0]);
  }

  async findByEmail(email) {
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, created_at, updated_at, deleted_at FROM customers WHERE email = ? AND deleted_at IS NULL`,
      [email]
    );
    return rows[0] ? new Customer(rows[0]) : null;
  }

  async list({ search = '', cursor = 0, limit = 20 }) {
    const safeSearch = typeof search === 'string' ? search : '';

    const q = `%${safeSearch}%`;

    const [rows] = await pool.query(
      `SELECT id, name, email, phone, created_at FROM customers
   WHERE deleted_at IS NULL AND (name LIKE ? OR email LIKE ?) AND id > ?
   ORDER BY id ASC LIMIT ?`,
      [q, q, Number(cursor), Number(limit)]
    );

    return rows.map(r => new Customer(r));
  }


  async update(id, { name, email, phone }) {
    await pool.execute(
      `UPDATE customers SET name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [name, email, phone, id]
    );
    return this.getById(id);
  }

  async softDelete(id) {
    await pool.execute(
      `UPDATE customers SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
    return true;
  }
}
