import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { validateEnv } from '#env.js';
import { getErrorMessage, getErrorStatusCode } from '#errors.js';
import {
  buildFastifyLoggerConfig,
  closeProductionLogStream,
} from '#utils/logger.js';
import { setupDatabase } from './db/db.js';

import health_router from '#routes/health.js';
import legacy_router from '#routes/legacy/index.js';
import v3_router from '#routes/v3/index.js';

const env = validateEnv();

const fastify = Fastify({
  logger: buildFastifyLoggerConfig(),
});

await setupDatabase(fastify);

fastify.decorate('env', env);

await fastify.register(health_router);
await fastify.register(fastifyStatic, {
  root: env.public_path,
  prefix: '/',
});
await fastify.register(legacy_router);
await fastify.register(v3_router, {
  prefix: '/v3',
});

fastify.setErrorHandler((err, _request, reply) => {
  const statusCode = getErrorStatusCode(err);
  const message = getErrorMessage(err);

  if (statusCode >= 500) {
    fastify.log.error(err);
  }

  return reply.status(statusCode).send({
    message,
    data: null,
  });
});

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    });
    fastify.log.info(`服务已启动，静态目录: ${env.public_path}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  fastify.log.info(`收到 ${signal}，正在关闭服务…`);
  closeProductionLogStream();
  await fastify.close();
  process.exit(0);
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

start();
