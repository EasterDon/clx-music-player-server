import { createConnection, createPool } from 'mysql2/promise';
import { config, configPool, config_v2, configPool_v2 } from './db.config.js';

const query = createConnection(config);
const pool = createPool(configPool);

const query_v2 = createConnection(config_v2);
const pool_v2 = createPool(configPool_v2);

export { query, pool, query_v2, pool_v2 };
