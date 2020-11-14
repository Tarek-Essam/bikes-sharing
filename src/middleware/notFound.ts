import express from 'express';
import CustomError from '../helpers/customError';

export default (req: express.Request) => {
  throw new CustomError({
    statusCode: 404,
    code: 'NOT_FOUND',
    message: `route ${req.path} is not found on the server!`,
  });
};
