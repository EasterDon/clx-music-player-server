import express from 'express';
import logger from 'morgan';

import path from 'path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

import clx_music_router from './routes/clx_music.mjs';
import app_value_router from './routes/app_value.mjs';
import {error_handler} from './error_handler.mjs';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../public')));

app.use('/musics',clx_music_router);
app.use('/app',app_value_router);

// 404页
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use(function(req,res,_next) {
  res.status(404).send('没有该页面');
});

// 错误处理
app.use(error_handler);

export default app;
