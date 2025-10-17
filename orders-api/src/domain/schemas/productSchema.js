import { z } from 'zod';

export const productUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    price_cents: z.number().int().positive().optional(),
    stock: z.number().int().nonnegative().optional()
});

export const productSchema = z.object({
    sku: z.string().min(1),
    name: z.string().min(1),
    price_cents: z.number().int().positive(),
    stock: z.number().int().nonnegative()
});
