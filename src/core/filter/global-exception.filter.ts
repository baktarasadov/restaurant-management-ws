import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { getReasonPhrase } from 'http-status-codes';
import { processValidationErrors } from 'src/common/util';
import { TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    if (Array.isArray(exception) && exception[0] instanceof ValidationError) {
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY),
        message: getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY),
        details: processValidationErrors(exception),
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    if (exception instanceof TypeORMError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
        message: exception.message,
      });
    }

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR);

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message;

    return response.status(statusCode).json({
      statusCode,
      error: getReasonPhrase(statusCode),
      message,
      details:
        exception instanceof UnprocessableEntityException
          ? (exception.getResponse() as any).details
          : null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
