import { Router } from 'express';
import app_router from './app.js';
import songs_router from './songs.js';

const router = Router();

router.use('/app', app_router);
router.use('/songs', songs_router);

export default router;
