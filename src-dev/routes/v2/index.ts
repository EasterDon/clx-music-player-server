import { Router } from 'express';
import songs_router from './songs.js';

const router = Router();

router.use('/songs', songs_router);

export default router;
