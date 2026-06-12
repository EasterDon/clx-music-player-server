import type { FastifyPluginAsync } from 'fastify';
import songs_router from './clx_music.js';

const router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(songs_router, {
    prefix: '/musics',
  });
};

export default router;
