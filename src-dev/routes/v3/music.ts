import { readFile } from 'fs/promises';
import path from 'path';

const router = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    const { rows } = await fastify.pg.query('SELECT * FROM music ORDER BY id');
    return { data: rows, message: '歌曲列表获取成功' };
  });

  fastify.get('/:id/notation', async (request, reply) => {
    const { id } = request.params;
    const { rows } = await fastify.pg.query(
      'SELECT notes FROM notation WHERE id = $1',
      [id],
    );

    if (rows.length === 0) {
      throw { statusCode: 404, message: '没有这首曲子哦～' };
    }
    const notesString = rows[0].notes;
    const notes = notesString;
    return { data: notes, message: '字母谱获取成功' };
  });

  fastify.get('/:id/lyrics', async (request, reply) => {
    const { id } = request.params;
    const lyrics = await readFile(
      path.join(process.env.songs_path!, `${id}/music.lrc`),
      'utf8',
    );

    return { data: lyrics, message: '歌词获取成功' };
  });
};

export default router;
