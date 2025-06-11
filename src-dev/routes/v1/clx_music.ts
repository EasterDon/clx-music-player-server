import { Router } from 'express';
import { pool } from '#db/db.js';
import { type RowDataPacket } from 'mysql2/promise';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [result] = await pool.query(
      'select id,name,author,"" as cover_url,"" as mp3_url from songs',
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<RowDataPacket[]>(
      'select notation from songs where id=?',
      [id],
    );
    if (result.length === 0) {
      throw new Error('没有这首曲子哦～');
    }
    res.status(200).json(result[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
