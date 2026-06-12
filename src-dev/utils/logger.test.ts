import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  dailyLogFileName,
  formatLogDate,
  formatLogMonth,
  getPreviousMonthKey,
  isProductionLogEnabled,
  listDailyLogFilesForMonth,
} from './logger.js';

describe('formatLogDate', () => {
  it('formats as YYYY-MM-DD', () => {
    assert.equal(
      formatLogDate(new Date(2026, 4, 20)),
      '2026-05-20',
    );
  });
});

describe('formatLogMonth', () => {
  it('formats as YYYY-MM', () => {
    assert.equal(formatLogMonth(new Date(2026, 3, 1)), '2026-04');
  });
});

describe('dailyLogFileName', () => {
  it('appends .log suffix', () => {
    assert.equal(dailyLogFileName(new Date(2026, 0, 1)), '2026-01-01.log');
  });
});

describe('listDailyLogFilesForMonth', () => {
  it('lists only matching daily logs for the month', () => {
    const files = [
      '2026-04-01.log',
      '2026-04-30.log',
      '2026-05-01.log',
      '2026-04.tar.gz',
      'app.log',
    ];
    assert.deepEqual(listDailyLogFilesForMonth(files, '2026-04'), [
      '2026-04-01.log',
      '2026-04-30.log',
    ]);
  });
});

describe('getPreviousMonthKey', () => {
  it('returns previous month on the first day', () => {
    assert.equal(
      getPreviousMonthKey(new Date(2026, 4, 1)),
      '2026-04',
    );
  });
});

describe('isProductionLogEnabled', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalLogToFile = process.env.LOG_TO_FILE;

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalNodeEnv;
    }
    if (originalLogToFile === undefined) {
      delete process.env.LOG_TO_FILE;
    } else {
      process.env.LOG_TO_FILE = originalLogToFile;
    }
  });

  it('is true when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.LOG_TO_FILE;
    assert.equal(isProductionLogEnabled(), true);
  });

  it('is true when LOG_TO_FILE is true', () => {
    delete process.env.NODE_ENV;
    process.env.LOG_TO_FILE = 'true';
    assert.equal(isProductionLogEnabled(), true);
  });

  it('is false in development defaults', () => {
    delete process.env.NODE_ENV;
    delete process.env.LOG_TO_FILE;
    assert.equal(isProductionLogEnabled(), false);
  });
});
