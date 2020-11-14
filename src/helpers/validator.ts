import Ajv from 'ajv';
import CustomError from './customError';

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: 'empty',
});

export default (path, schema) => (req, res, next) => {
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
