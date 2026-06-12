import { readFile } from 'fs/promises';
import path from 'path';
import type { FastifyInstance } from 'fastify';
import { HttpError } from '#errors.js';
import { parseSongId } from '#utils/song-id.js';

export type MusicRow = Record<string, unknown>;

export async function listMusic(
  fastify: FastifyInstance,
): Promise<MusicRow[]> {
  const { rows } = await fastify.pg.query<MusicRow>(
    'SELECT * FROM music ORDER BY id',
  );
  return rows;
}

export async function getNotation(
  fastify: FastifyInstance,
  rawId: string,
): Promise<unknown> {
  const id = parseSongId(rawId);
  const { rows } = await fastify.pg.query<{ notes: unknown }>(
    'SELECT notes FROM notation WHERE id = $1',
    [id],
  );

  if (rows.length === 0) {
    throw new HttpError(404, '没有这首曲子哦～');
  }

  return rows[0].notes;
}

export async function getLyrics(
  songsPath: string,
  rawId: string,
): Promise<string> {
  const id = parseSongId(rawId);
  const base = path.resolve(songsPath);
  const filePath = path.resolve(base, id, 'music.lrc');

  if (filePath !== base && !filePath.startsWith(base + path.sep)) {
    throw new HttpError(400, '无效的歌曲路径');
  }

  try {
    return await readFile(filePath, 'utf8');
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') {
      throw new HttpError(404, '歌词文件不存在');
    }
    throw err;
  }
}
