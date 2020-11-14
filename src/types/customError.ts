interface CustomError {
  statusCode: number
  code: string
  message: string
  details?: Array<{
    field: string,
    message: string,
    error?: string,
    dataPath?: string,
    params?: object,
  }>
}

export default CustomError;
