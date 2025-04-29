import {Router} from 'express';
import {pool} from '../db/db.mjs';
import {RowDataPacket} from 'mysql2/promise';
const router = Router();

router.get('/',async (_req,res,next)=>{
  try {
    const [result] = await pool.query<RowDataPacket[]>(
      'select* from app where id = (select max(id) from app);'
    );
    res.status(200).json(result[0]);
  }catch(error){
    next(error);
  }
});

export default router;
