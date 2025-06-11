import { Router } from 'express';
import songs_router from './clx_music.js';

const router = Router();

router.use('/musics', songs_router);

export default router;
