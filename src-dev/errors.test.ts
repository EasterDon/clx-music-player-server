import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  HttpError,
  getErrorMessage,
  getErrorStatusCode,
} from './errors.js';

describe('getErrorStatusCode', () => {
  it('reads HttpError.statusCode', () => {
    assert.equal(getErrorStatusCode(new HttpError(404, 'x')), 404);
  });

  it('reads legacy status and statusCode fields', () => {
    assert.equal(getErrorStatusCode({ statusCode: 400 }), 400);
    assert.equal(getErrorStatusCode({ status: 404 }), 404);
  });

  it('defaults to 500', () => {
    assert.equal(getErrorStatusCode(new Error('fail')), 500);
  });
});

describe('getErrorMessage', () => {
  it('returns Error.message', () => {
    assert.equal(getErrorMessage(new Error('oops')), 'oops');
  });

  it('falls back for unknown errors', () => {
    assert.equal(getErrorMessage({}), '服务器内部错误');
  });
});
