import express from 'express';
import swaggerDocument from '../swagger.json';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  swaggerDocument.host = req.get('host');
  next();
};
