import { httpClient } from '../utils/httpClient.js';

const CUSTOMERS_API_URL = process.env.CUSTOMERS_API_URL;

export async function getCustomerById(id) {
    const res = await httpClient(`${CUSTOMERS_API_URL}/internal/customers/${id}`);
    return res.ok ? res.data : null;
}
