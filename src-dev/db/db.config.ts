const config = {
  host: '127.0.0.1',
  user: process.env.db_manager_name,
  password: process.env.db_password,
  database: process.env.db_name
};

const config_v2 = {
  host: '127.0.0.1',
  user: process.env.db_manager_name,
  password: process.env.db_password,
  database: process.env.db_name_v2
};

const configPool = {
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  // max idle connections, the default value is the same as `connectionLimit`
  maxIdle: 10,
  // idle connections timeout, in milliseconds, the default value 60000
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

const configPool_v2 = {
  ...config_v2,
  waitForConnections: true,
  connectionLimit: 10,
  // max idle connections, the default value is the same as `connectionLimit`
  maxIdle: 10,
  // idle connections timeout, in milliseconds, the default value 60000
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

export {config,configPool,config_v2,configPool_v2};
