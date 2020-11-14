import { CustomError } from '../../types';

const mapError = (err): CustomError => {
  let customError;
  if (err.statusCode < 500) {
    customError = {
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details || [],
    };
  } else {
    customError = {
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
      details: [],
    };
  }
  return customError;
};

export default mapError;
