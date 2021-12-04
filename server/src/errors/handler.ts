import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let _errors: ValidationErrors = {};

    error.inner.forEach((err: any) => {
      _errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', _errors });
  }
  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
