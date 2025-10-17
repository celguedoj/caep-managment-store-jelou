export default function makeGetProduct({ productRepository }) {
    return async function getProduct(id) {
        const product = await productRepository.getById(id);
        if (!product) {
            const err = new Error('Product not found');
            err.status = 404;
            throw err;
        }
        return product;
    };
}
