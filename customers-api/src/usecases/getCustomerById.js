export default function makeGetCustomerById({ customerRepository }) {
  return async function getCustomerById(id) {
    const customer = await customerRepository.getById(id);
    if (!customer) {
      const err = new Error('Customer not found');
      err.status = 404;
      throw err;
    }
    return customer;
  };
}
