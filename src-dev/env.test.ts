import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { missingRequiredEnvKeys, buildEnvConfig } from './env.js';

const REQUIRED_ENV: Record<string, string> = {
  db_manager_name: 'user',
  db_password: 'pass',
  db_name: 'music_db',
  public_path: './public',
  songs_path: './public/songs',
};

describe('missingRequiredEnvKeys', () => {
  const original = { ...process.env };

  beforeEach(() => {
    for (const key of Object.keys(REQUIRED_ENV)) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it('lists all required keys when env is empty', () => {
    const missing = missingRequiredEnvKeys();
    assert.equal(missing.length, 5);
    assert.ok(missing.includes('db_name'));
  });

  it('returns empty when all required keys are set', () => {
    Object.assign(process.env, REQUIRED_ENV);
    assert.deepEqual(missingRequiredEnvKeys(), []);
  });

  it('treats whitespace-only values as missing', () => {
    Object.assign(process.env, { ...REQUIRED_ENV, db_name: '   ' });
    assert.ok(missingRequiredEnvKeys().includes('db_name'));
  });
});

describe('buildEnvConfig', () => {
  const original = { ...process.env };

  beforeEach(() => {
    Object.assign(process.env, REQUIRED_ENV);
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it('resolves public_path and songs_path to absolute paths', () => {
    const config = buildEnvConfig();
    assert.ok(path.isAbsolute(config.public_path));
    assert.ok(path.isAbsolute(config.songs_path));
    assert.equal(config.db_manager_name, 'user');
    assert.equal(config.db_name, 'music_db');
  });
});
