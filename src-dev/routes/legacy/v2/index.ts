import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import songs_router from './songs.js';

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(songs_router, {
    prefix: '/songs',
  });
};

export default router;
