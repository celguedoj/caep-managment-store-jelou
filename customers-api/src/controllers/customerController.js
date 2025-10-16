import MysqlCustomerRepository from '../adapters/repositories/mysqlCustomerRepository.js';
import makeCreateCustomer from '../usecases/createCustomer.js';
import makeGetCustomerById from '../usecases/getCustomerById.js';
import makeListCustomers from '../usecases/listCustomers.js';
import makeUpdateCustomer from '../usecases/updateCustomer.js';
import makeDeleteCustomer from '../usecases/deleteCustomer.js';

const customerRepository = new MysqlCustomerRepository();

const createCustomer = makeCreateCustomer({ customerRepository });
const getCustomerById = makeGetCustomerById({ customerRepository });
const listCustomers = makeListCustomers({ customerRepository });
const updateCustomer = makeUpdateCustomer({ customerRepository });
const deleteCustomer = makeDeleteCustomer({ customerRepository });

export default {
    create: async (req, res, next) => {
        try {
            const created = await createCustomer(req.body);
            res.status(201).json(created);
        } catch (err) { next(err); }
    },

    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await getCustomerById(id);
            res.json(customer);
        } catch (err) { next(err); }
    },

    list: async (req, res, next) => {
        try {
            const query = {
                search: req.query.search,
                cursor: req.query.cursor,
                limit: req.query.limit
            };
            const rows = await listCustomers(query);
            res.json({ items: rows });
        } catch (err) { next(err); }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updated = await updateCustomer(id, req.body);
            res.json(updated);
        } catch (err) { next(err); }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await deleteCustomer(id);
            res.json(result);
        } catch (err) { next(err); }
    }
};
