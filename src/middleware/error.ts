import express from 'express';
import mapError from '../helpers/errorMapper';
import { CustomError } from '../types';

export default (
  error, req: express.Request, res: express.Response, next: express.NextFunction,
) => {
  const mappedError: CustomError = mapError(error);
  res.status(mappedError.statusCode).send(mappedError);
};
