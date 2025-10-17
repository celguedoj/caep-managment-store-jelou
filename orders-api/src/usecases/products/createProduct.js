import { productSchema } from "../../domain/schemas/productSchema.js";

export default function makeCreateProduct({ productRepository }) {
    return async function createProduct(data) {
        const parsed = productSchema.parse(data);
        return await productRepository.create(parsed);
    };
}
