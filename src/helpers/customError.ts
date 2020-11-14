import { CustomError } from '../types';

class CustomErrorClass extends Error {
  constructor({
    statusCode, code, message, details = [],
  }: CustomError) {
    super(message);
    Object.assign(this, {
      statusCode, code, details,
    });
  }
}

export default CustomErrorClass;
