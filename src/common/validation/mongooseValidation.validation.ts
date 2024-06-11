import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoError, Document } from 'mongodb';
import { Response } from 'express';

interface MongoErrorWithKeyValue extends MongoError {
  keyValue: Document;
}

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('ASdasd');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 11000:
        // Handle duplicate key error
        const duplicateKeyError = this.handleDuplicateKeyError(exception);
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          data: Object.keys(exception.keyValue)[0],
          message: duplicateKeyError,
          error: 'Conflict',
        });
        break;
      default:
        // Handle other MongoDB errors
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
          error: 'Internal Server Error',
        });
    }
  }

  private handleDuplicateKeyError(exception: MongoErrorWithKeyValue): string {
    const fieldName = Object.keys(exception.keyValue)[0];
    const value = exception.keyValue[fieldName];
    return `Duplicate value '${value}' for field '${fieldName}'.`;
  }
}
