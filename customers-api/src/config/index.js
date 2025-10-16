export default {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'jeloudb'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret_carlos',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  serviceToken: process.env.SERVICE_TOKEN || 'service_token',
  serviceTokenHeaderName: process.env.SERVICE_TOKEN_HEADER_NAME || 'SERVICE_TOKEN'
};