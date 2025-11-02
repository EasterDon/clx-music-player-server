import music_router from './music.js';
import app_router from './app.js';

const router = async (fastify, options) => {
  fastify.register(music_router, {
    prefix: '/music',
  });
  fastify.register(app_router, {
    prefix: '/app',
  });
};

export default router;
