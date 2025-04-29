import {ErrorRequestHandler} from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const error_handler:ErrorRequestHandler = (err,req,res,_next)=>{
  res.status(err.status || 500).send(err.message);
};
