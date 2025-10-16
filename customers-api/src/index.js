import express from 'express';
import config from './config/index.js';
import customersRoutes from './routes/customersRoutes.js';

const app = express();
app.use(express.json());

// health
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'customers-api' }));

app.use('/', customersRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal error' });
});

app.listen(config.port, () => {
  console.log(`Customers API listening on port ${config.port}`);
});
