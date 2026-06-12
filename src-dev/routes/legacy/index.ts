import type { FastifyPluginAsync } from 'fastify';
import legacy_app_router from './app.js';
import v1_router from './v1/index.js';
import v2_router from './v2/index.js';

/** 旧版 api，仅兼容旧客户端，不再维护 */
const router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(legacy_app_router, {
    prefix: '/app',
  });
  await fastify.register(v1_router, {
    prefix: '/',
  });
  await fastify.register(v2_router, {
    prefix: '/v2',
  });
};

export default router;
