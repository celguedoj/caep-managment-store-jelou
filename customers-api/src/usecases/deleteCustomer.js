export default function makeDeleteCustomer({ customerRepository }) {
  return async function deleteCustomer(id) {
    const current = await customerRepository.getById(id);
    if (!current) {
      const err = new Error('Customer not found');
      err.status = 404;
      throw err;
    }
    await customerRepository.softDelete(id);
    return { success: true };
  };
}
