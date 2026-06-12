import type { FastifyPluginAsync } from 'fastify';
import { getLatestAppInfo } from '#services/app-info.js';

const router: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return getLatestAppInfo(fastify);
  });
};

export default router;
