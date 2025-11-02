const router = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    const { rows } = await fastify.pg.query(
      'SELECT * FROM app WHERE id = (SELECT MAX(id) FROM app)',
    );
    return { data: rows[0], message: '软件版本信息获取成功' };
  });
};

export default router;
