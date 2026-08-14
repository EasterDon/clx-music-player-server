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
    const rows = await listMusic(fastify);
    return { data: rows, message: '歌曲列表获取成功' };
  });

  fastify.get<{ Params: { id: string } }>(
    '/:id/notation',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const notes = await getNotation(fastify, request.params.id);
      return { data: notes, message: '字母谱获取成功' };
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id/lyrics',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const lyrics = await getLyrics(fastify.env.songs_path, request.params.id);
      return { data: lyrics, message: '歌词获取成功' };
    },
  );
};

export default router;
