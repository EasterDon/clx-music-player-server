import type { FastifyPluginAsync } from 'fastify';
import {
  getLyrics,
  getNotation,
  listMusic,
} from '#services/music.js';

const router: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return listMusic(fastify);
  });

  fastify.get<{ Params: { id: string } }>(
    '/:id/notation',
    async (request) => {
      return getNotation(fastify, request.params.id);
    },
  );

  fastify.get<{ Params: { id: string } }>('/:id/lyrics', async (request) => {
    return getLyrics(fastify.env.songs_path, request.params.id);
  });
};

export default router;
