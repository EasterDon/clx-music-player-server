import express from 'express';
import logger from 'morgan';

import app_value_router from '#routes/app.js';
import clx_music_router from '#routes/v1/index.js';
import v2_router from '#routes/v2/index.js';
import { error_handler } from '#error_handler.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(process.env.public_path!));

app.use('/app', app_value_router);
// 初版 api 接口，为方便不想升级应用的用户留
app.use('/', clx_music_router);
// v2 接口
app.use('/v2', v2_router);

// 404页
app.use(function (_req, res, _next) {
  res.status(404).send('没有该页面');
});

// 错误处理
app.use(error_handler);

export default app;
