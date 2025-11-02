import songs_router from './songs.js';

const router = async (fastify, options) => {
  fastify.register(songs_router, {
    prefix: '/songs'
  });
}

export default router;