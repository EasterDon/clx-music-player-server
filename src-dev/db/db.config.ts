const config = {
  host: '127.0.0.1',
  port: 5432,
  user: process.env.db_manager_name,
  password: process.env.db_password,
  database: process.env.db_name,
};

const configPool = {
  ...config,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 60000,
    acquireTimeoutMillis: 60000,
    reapIntervalMillis: 1000
  }
};

export { configPool };