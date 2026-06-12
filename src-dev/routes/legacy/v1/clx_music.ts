import type { FastifyPluginAsync } from 'fastify';

const router: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    const { rows } = await fastify.pg.query(
      'select id,name,author,\'\' as cover_url,\'\' as mp3_url from music ORDER BY id',
    );
    return rows;
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params;
    const { rows } = await fastify.pg.query(
      'select notes from notation where id=$1',
      [id],
    );
    if (rows.length === 0) {
      throw { status: 404, message: '没有该曲' };
    }
    const res = JSON.stringify(rows[0].notes);
    return res;
  });
};

export default router;
