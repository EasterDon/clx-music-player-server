import type { EnvConfig } from '#env.js';

declare module 'fastify' {
  interface FastifyInstance {
    env: EnvConfig;
  }
}
