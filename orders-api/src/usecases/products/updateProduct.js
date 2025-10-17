import { productUpdateSchema } from "../../domain/schemas/productSchema.js";

export default function makeUpdateProduct({ productRepository }) {
  return async function updateProduct(id, data) {
    const parsed = productUpdateSchema.parse(data);
    const existing = await productRepository.getById(id);
    if (!existing) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    return await productRepository.update(id, parsed);
  };
}
