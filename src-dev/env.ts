import path from 'path';
import { colorize } from '#utils/colors.js';

const REQUIRED_KEYS = [
  'db_manager_name',
  'db_password',
  'db_name',
  'public_path',
  'songs_path',
] as const;

export type EnvConfig = {
  db_manager_name: string;
  db_password: string;
  db_name: string;
  public_path: string;
  songs_path: string;
};

export function missingRequiredEnvKeys(): string[] {
  return REQUIRED_KEYS.filter((key) => !process.env[key]?.trim());
}

export function buildEnvConfig(): EnvConfig {
  return {
    db_manager_name: process.env.db_manager_name!.trim(),
    db_password: process.env.db_password!.trim(),
    db_name: process.env.db_name!.trim(),
    public_path: path.resolve(process.env.public_path!.trim()),
    songs_path: path.resolve(process.env.songs_path!.trim()),
  };
}

export function validateEnv(): EnvConfig {
  const missing = missingRequiredEnvKeys();

  if (missing.length > 0) {
    console.error(
      `${colorize.red('❌')} 缺少环境变量: ${missing.join(', ')}\n`,
    );
    process.exit(1);
  }

  return buildEnvConfig();
}
