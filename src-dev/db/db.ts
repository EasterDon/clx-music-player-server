import type { FastifyInstance } from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import { colorize } from '#utils/colors.js';
import { configPool } from './db.config.js';

export const setupDatabase = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyPostgres, configPool);

  try {
    const { rows } = await fastify.pg.query<{ result: number }>(
      'SELECT 1 + 1 as result',
    );
    console.log(
      `${colorize.green('✅')} PostgreSQL 连接成功: 1+1=${rows[0].result}`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      `${colorize.red('❌')} PostgreSQL 连接失败\n${colorize.red('└─' + message)}`,
    );
    throw error;
  }
};
