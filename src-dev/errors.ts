export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export function getErrorStatusCode(err: unknown): number {
  if (err instanceof HttpError) {
    return err.statusCode;
  }
  if (err && typeof err === 'object') {
    const e = err as { statusCode?: number; status?: number };
    if (typeof e.statusCode === 'number') {
      return e.statusCode;
    }
    if (typeof e.status === 'number') {
      return e.status;
    }
  }
  return 500;
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return '服务器内部错误';
}
