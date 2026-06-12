import type { FastifyPluginAsync } from 'fastify';

const router: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (_request, reply) => {
    try {
      await fastify.pg.query('SELECT 1');
      return reply.status(200).send({ status: 'ok' });
    } catch {
      return reply.status(503).send({
        status: 'unhealthy',
        message: 'database unavailable',
      });
    }
  });
};

export default router;
