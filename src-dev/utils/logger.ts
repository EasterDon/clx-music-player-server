import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { Writable } from 'stream';
import * as tar from 'tar';
import type { FastifyServerOptions } from 'fastify';
import pino from 'pino';

/** 生产环境：NODE_ENV=production 或 LOG_TO_FILE=true */
export function isProductionLogEnabled(): boolean {
  return (
    process.env.NODE_ENV === 'production'
    || process.env.LOG_TO_FILE === 'true'
  );
}

export function getLogDir(): string {
  const raw = process.env.LOG_DIR?.trim() || './logs';
  return path.resolve(raw);
}

/** 日志文件名日期部分：YYYY-MM-DD */
export function formatLogDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 归档包名月份部分：YYYY-MM */
export function formatLogMonth(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function dailyLogFileName(date: Date): string {
  return `${formatLogDate(date)}.log`;
}

export function listDailyLogFilesForMonth(
  fileNames: string[],
  month: string,
): string[] {
  const pattern = new RegExp(`^${month}-\\d{2}\\.log$`);
  return fileNames.filter((name) => pattern.test(name)).sort();
}

export function getPreviousMonthKey(now = new Date()): string {
  return formatLogMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
}

class DailyRotatingStream extends Writable {
  private currentDate = '';
  private fileStream: ReturnType<typeof createWriteStream> | null = null;

  constructor(private readonly logDir: string) {
    super();
    mkdirSync(logDir, { recursive: true });
  }

  private rotate(dateKey: string): void {
    if (dateKey === this.currentDate && this.fileStream) {
      return;
    }
    this.fileStream?.end();
    this.currentDate = dateKey;
    const filePath = path.join(this.logDir, `${dateKey}.log`);
    this.fileStream = createWriteStream(filePath, { flags: 'a' });
  }

  _write(
    chunk: Buffer | string,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    try {
      this.rotate(formatLogDate(new Date()));
      this.fileStream!.write(chunk, encoding, callback);
    } catch (err) {
      callback(err instanceof Error ? err : new Error(String(err)));
    }
  }

  _final(callback: (error?: Error | null) => void): void {
    this.fileStream?.end(callback);
  }
}

let lastArchivedMonth = '';

export async function archivePreviousMonthLogs(
  logDir: string,
  now = new Date(),
): Promise<boolean> {
  if (now.getDate() !== 1) {
    return false;
  }

  const month = getPreviousMonthKey(now);
  if (lastArchivedMonth === month) {
    return false;
  }

  const archivesDir = path.join(logDir, 'archives');
  const archivePath = path.join(archivesDir, `${month}.tar.gz`);

  if (existsSync(archivePath)) {
    lastArchivedMonth = month;
    return false;
  }

  const names = await readdir(logDir);
  const files = listDailyLogFilesForMonth(names, month);
  if (files.length === 0) {
    return false;
  }

  mkdirSync(archivesDir, { recursive: true });
  await tar.c({ gzip: true, file: archivePath, cwd: logDir }, files);

  for (const file of files) {
    await unlink(path.join(logDir, file));
  }

  lastArchivedMonth = month;
  return true;
}

let monthlyArchiveTimer: NodeJS.Timeout | undefined;
let dailyLogStream: DailyRotatingStream | undefined;

export function startMonthlyArchiveScheduler(logDir: string): void {
  const run = () => {
    void archivePreviousMonthLogs(logDir).catch((err) => {
      console.error('月度日志归档失败:', err);
    });
  };

  run();

  if (monthlyArchiveTimer) {
    clearInterval(monthlyArchiveTimer);
  }

  monthlyArchiveTimer = setInterval(run, 60 * 60 * 1000);
  monthlyArchiveTimer.unref();
}

export function buildFastifyLoggerConfig(): FastifyServerOptions['logger'] {
  const level = process.env.LOG_LEVEL ?? 'info';

  if (!isProductionLogEnabled()) {
    return { level };
  }

  const logDir = getLogDir();
  dailyLogStream = new DailyRotatingStream(logDir);
  startMonthlyArchiveScheduler(logDir);

  return {
    level,
    stream: pino.multistream([
      { level: level as pino.Level, stream: dailyLogStream },
      { level: level as pino.Level, stream: process.stdout },
    ]),
  };
}

export function closeProductionLogStream(): void {
  if (monthlyArchiveTimer) {
    clearInterval(monthlyArchiveTimer);
    monthlyArchiveTimer = undefined;
  }
  dailyLogStream?.end();
  dailyLogStream = undefined;
}
