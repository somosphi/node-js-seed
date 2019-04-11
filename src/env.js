require('dotenv').config();

module.exports = {
  /* Database */
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10),
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN, 10),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX, 10),
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  /* Application */
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV,
  BODY_LIMIT: process.env.BODY_LIMIT || '500kb',
  HOSTNAME: process.env.HOSTNAME,
  SERVICE_URL: process.env.SERVICE_URL,
  SERVICE_NAME: process.env.SERVICE_NAME,
  AUTHORIZATION_SERVER: process.env.AUTHORIZATION_SERVER,
  EUREKA_HOST: process.env.EUREKA_HOST,
  EUREKA_PORT: parseInt(process.env.EUREKA_PORT, 10),
  APM_URL: process.env.APM_URL,
  APM_TOKEN: process.env.APM_TOKEN,

  /* Settings */
  PLACEHOLDER_URL: process.env.PLACEHOLDER_URL,
};
