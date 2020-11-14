import Ajv from 'ajv';
import express from 'express';
import CustomError from './customError';

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: 'empty',
});

export default (path, schema) => (req: express.Request, res: express.Response, next:express.NextFunction) => {
  const validateData = ajv.compile(schema);
  const valid = validateData(req[path]);
  if (valid) return next();
  throw new CustomError({
    statusCode: 422,
    code: 'VALIDATION_ERROR',
    message: 'data submited is not valid',
    details: validateData.errors as any,
  });
};
