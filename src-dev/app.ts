import express from 'express';
import logger from 'morgan';

import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import clx_music_router from '#routes/clx_music.js';
import app_value_router from '#routes/app_value.js';
import v2_router from '#routes/v2/index.js';
import { error_handler } from '#error_handler.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/musics', clx_music_router);
app.use('/app', app_value_router);
app.use('/v2', v2_router);

// 404页
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use(function (req, res, _next) {
  res.status(404).send('没有该页面');
});

// 错误处理
app.use(error_handler);

export default app;
