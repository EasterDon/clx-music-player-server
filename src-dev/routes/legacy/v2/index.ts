import type { FastifyPluginAsync } from 'fastify';
import songs_router from './songs.js';

const router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(songs_router, {
    prefix: '/songs',
  });
};

export default router;
