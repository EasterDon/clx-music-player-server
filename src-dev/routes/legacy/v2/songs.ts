import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
} from 'fastify';
import {
  getLyrics,
  getNotation,
  listMusic,
} from '#services/music.js';

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', async () => {
    return listMusic(fastify);
  });

  fastify.get<{ Params: { id: string } }>(
    '/:id/notation',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      return getNotation(fastify, request.params.id);
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id/lyrics',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      return getLyrics(fastify.env.songs_path, request.params.id);
    },
  );
};

export default router;
