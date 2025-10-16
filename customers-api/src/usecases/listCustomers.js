import { z } from 'zod';

const querySchema = z.object({
  search: z.string().optional().nullable(),
  cursor: z.preprocess(val => Number(val || 0), z.number().nonnegative()),
  limit: z.preprocess(val => Number(val || 20), z.number().min(1).max(100))
});

export default function makeListCustomers({ customerRepository }) {
  return async function listCustomers(query) {
    const q = querySchema.parse(query);
    const rows = await customerRepository.list(q);
    return rows;
  };
}
