const router = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    const { rows } = await fastify.pg.query(
      "select id,name,author,'' as cover_url,'' as mp3_url from music ORDER BY id",
    );
    return rows;
  });

  fastify.get('/:id', async (request, reply) => {
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
