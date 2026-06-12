import type { FastifyInstance } from 'fastify';
import { HttpError } from '#errors.js';

export type AppInfoRow = Record<string, unknown>;

export async function getLatestAppInfo(
  fastify: FastifyInstance,
): Promise<AppInfoRow> {
  const { rows } = await fastify.pg.query<AppInfoRow>(
    'SELECT * FROM app WHERE id = (SELECT MAX(id) FROM app)',
  );

  if (rows.length === 0) {
    throw new HttpError(404, '暂无版本信息');
  }

  return rows[0];
}
