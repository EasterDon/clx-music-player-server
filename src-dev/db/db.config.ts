const parseDbPort = (raw: string | undefined): number => {
  if (!raw?.trim()) {
    return 5432;
  }
  const port = Number(raw.trim());
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`❌ 无效的 db_port: ${raw}`);
    process.exit(1);
  }
  return port;
};

const config = {
  host: process.env.db_host?.trim() || '127.0.0.1',
  port: parseDbPort(process.env.db_port),
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
    reapIntervalMillis: 1000,
  },
};

export { configPool };
