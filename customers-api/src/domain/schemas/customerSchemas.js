import { z } from 'zod';


export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
  phone: z.string().optional()
});

export const updateCustomerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  phone: z.string().optional()
});
