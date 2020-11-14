import { CustomError } from '../types';

class CustomErrorClass extends Error {
  /**
   * @param  {} {statusCode
   * @param  {} code
   * @param  {} message
   * @param  {} details=[]
   * @param  {CustomError} }
   */
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
