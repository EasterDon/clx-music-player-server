import { Router } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { type RowDataPacket } from 'mysql2/promise';
import { pool } from '#db/db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [result] = await pool.query('select id,name,author from songs');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/notation', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<RowDataPacket[]>(
      'select notation from songs where id=?',
      [id],
    );
    if (result.length === 0) {
      throw new Error('没有这首曲子哦～');
    }
    const notation = JSON.parse(result[0].notation);
    res.status(200).json(notation);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/lyrics', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await readFile(
      path.join(process.env.songs_path!, `${id}/music.lrc`),
      'utf8',
    );
    res.status(200).contentType('text/plain; charset=utf-8').send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
