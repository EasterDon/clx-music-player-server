import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { HttpError } from '#errors.js';
import { parseSongId } from './song-id.js';

describe('parseSongId', () => {
  it('accepts numeric ids', () => {
    assert.equal(parseSongId('1'), '1');
    assert.equal(parseSongId('42'), '42');
  });

  it('rejects non-numeric ids', () => {
    assert.throws(() => parseSongId('abc'), HttpError);
    assert.throws(() => parseSongId('../1'), HttpError);
    assert.throws(() => parseSongId('1/2'), HttpError);
  });
});
