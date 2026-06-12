import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { HttpError } from '#errors.js';
import { getLyrics } from './music.js';

describe('getLyrics', () => {
  let songsPath: string;

  before(async () => {
    songsPath = await mkdtemp(path.join(tmpdir(), 'clx-songs-'));
    await mkdir(path.join(songsPath, '1'), { recursive: true });
    await writeFile(
      path.join(songsPath, '1', 'music.lrc'),
      'line one',
      'utf8',
    );
  });

  after(async () => {
    await rm(songsPath, { recursive: true, force: true });
  });

  it('reads lyrics for a valid numeric id', async () => {
    const lyrics = await getLyrics(songsPath, '1');
    assert.equal(lyrics, 'line one');
  });

  it('returns 404 when the lyrics file is missing', async () => {
    await assert.rejects(
      () => getLyrics(songsPath, '99'),
      (err: unknown) => {
        assert.ok(err instanceof HttpError);
        assert.equal(err.statusCode, 404);
        return true;
      },
    );
  });

  it('rejects non-numeric ids', async () => {
    await assert.rejects(
      () => getLyrics(songsPath, '../1'),
      HttpError,
    );
  });
});
