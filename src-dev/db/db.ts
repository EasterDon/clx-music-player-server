import { createConnection, createPool } from 'mysql2/promise';
import { config, configPool } from './db.config.js';

const query = createConnection(config);
const pool = createPool(configPool);

export { query, pool };
