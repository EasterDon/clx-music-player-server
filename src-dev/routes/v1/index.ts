import songs_router from './clx_music.js';

const router = async (fastify, options) => {
  fastify.register(songs_router, {
    prefix: '/musics'
  });
}

export default router;
