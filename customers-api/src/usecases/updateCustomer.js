import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional()
});

export default function makeUpdateCustomer({ customerRepository }) {
  return async function updateCustomer(id, body) {
    const parsed = updateSchema.parse(body);

    if (parsed.email) {
      const byEmail = await customerRepository.findByEmail(parsed.email);
      if (byEmail && Number(byEmail.id) !== Number(id)) {
        const err = new Error('Email already exists');
        err.status = 409;
        throw err;
      }
    }

    // fetch current to supply missing fields
    const current = await customerRepository.getById(id);
    if (!current) {
      const err = new Error('Customer not found');
      err.status = 404;
      throw err;
    }

    const payload = {
      name: parsed.name ?? current.name,
      email: parsed.email ?? current.email,
      phone: parsed.phone ?? current.phone
    };

    const updated = await customerRepository.update(id, payload);
    return updated;
  };
}
