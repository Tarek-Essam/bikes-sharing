import { CustomError } from '../../types';
import getArrayLastElement from '../utils';

const getFieldName = (f) => (f.keyword === 'required' ? f.params.missingProperty : getArrayLastElement(f.dataPath.split('.')));

const mapValidationError = (err): CustomError => ({
  statusCode: 422,
  code: 'VALIDATION_ERROR',
  message: err.message,
  details: err.validation.map((f) => ({
    field: getFieldName(f),
    message: f.message,
    error: f.keyword,
    dataPath: f.dataPath.slice(1),
    params: f.params,
  })),
});

export default mapValidationError;
