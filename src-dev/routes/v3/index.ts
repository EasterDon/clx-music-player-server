import type { FastifyPluginAsync } from 'fastify';
import music_router from './music.js';
import app_router from './app.js';

const router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(music_router, {
    prefix: '/music',
  });
  await fastify.register(app_router, {
    prefix: '/app',
  });
};

export default router;
