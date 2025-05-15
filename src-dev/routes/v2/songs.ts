import { Router } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { type RowDataPacket } from 'mysql2/promise';
import { pool_v2 } from '#db/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicLibrary = path.join(__dirname, '../../../public/songs');

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [result] = await pool_v2.query(
      'select id,name,author,cover_url,mp3_url from songs',
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/notation', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool_v2.query<RowDataPacket[]>(
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
      path.join(publicLibrary, `${id}/music.lrc`),
      'utf8',
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
