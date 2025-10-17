import { z } from 'zod';

export const orderSchema = z.object({
    customer_id: z.number().int().positive(),
    items: z.array(
        z.object({
            product_id: z.number().int().positive(),
            qty: z.number().int().positive()
        })
    )
});

export const listSchema = z.object({
    status: z.enum(['CREATED', 'CONFIRMED', 'CANCELED']).optional(),
    limit: z.preprocess((v) => Number(v || 20), z.number().min(1).max(100))
});