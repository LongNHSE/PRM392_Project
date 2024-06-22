import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Catch both HttpException and Error
@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine if the exception is an HttpException to get the status code
    // Otherwise, default to 500
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Use the status code determined above
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
