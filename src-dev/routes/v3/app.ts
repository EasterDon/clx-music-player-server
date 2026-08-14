import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { getLatestAppInfo } from '#services/app-info.js';

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', async () => {
    const data = await getLatestAppInfo(fastify);
    return { data, message: '软件版本信息获取成功' };
  });
};

export default router;
