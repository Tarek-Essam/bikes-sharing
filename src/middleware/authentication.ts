import express from 'express';
import CustomError from '../helpers/customError';
import config from '../config';

const { token } = config;

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== token) {
    throw new CustomError({
      statusCode: 401,
      code: 'UNAUTHORIZED',
      message: 'please provide a valid token',
    });
  }
  next();
};
