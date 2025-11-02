import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { setupDatabase } from './db/db.js';

import app_value_router from '#routes/app.js';
import clx_music_router from '#routes/v1/index.js';
import v2_router from '#routes/v2/index.js';
import v3_router from '#routes/v3/index.js';

const fastify = Fastify({
  logger: false,
});

await setupDatabase(fastify);

fastify.register(fastifyStatic, {
  root: process.env.public_path!, // 静态文件目录
  prefix: '/', // 访问前缀
});

fastify.register(app_value_router, {
  prefix: '/app',
});
// 初版 api 接口，为方便不想升级应用的用户留
fastify.register(clx_music_router, {
  prefix: '/',
});
// v2 接口
fastify.register(v2_router, {
  prefix: '/v2',
});
// v3 接口
fastify.register(v3_router, {
  prefix: '/v3',
});

fastify.setErrorHandler((err, request, reply) => {
  return reply.status(err.status || 500).send({
    message: err.message,
    data: null,
  });
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0',
    });
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
