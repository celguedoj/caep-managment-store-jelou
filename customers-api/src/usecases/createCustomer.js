import { createCustomerSchema } from '../domain/schemas/customerSchemas.js';

export default function makeCreateCustomer({ customerRepository }) {
  return async function createCustomer(data) {
    const parsed = createCustomerSchema.parse(data);

    const existing = await customerRepository.findByEmail(parsed.email);
    if (existing) {
      const err = new Error('Email already exists');
      err.status = 409;
      throw err;
    }

    const created = await customerRepository.create(parsed);
    return created;
  };
}
