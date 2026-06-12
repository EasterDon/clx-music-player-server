import { HttpError } from '#errors.js';

export function parseSongId(raw: string): string {
  if (!/^\d+$/.test(raw)) {
    throw new HttpError(400, '无效的歌曲 ID');
  }
  return raw;
}
