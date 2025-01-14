import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpErrorResponseDto<T> extends HttpException {
  constructor(
    private readonly statusCode: HttpStatus,
    readonly message: string,
    private readonly details: T,
  ) {
    super(
      HttpErrorResponseDto.createErrorBody(statusCode, message, details),
      statusCode,
    );
  }

  static createErrorBody<T>(
    statusCode: HttpStatus,
    message: string,
    details?: T,
  ): any {
    return {
      statusCode: statusCode || 500,
      message: message || 'Something went wrong!',
      details,
    };
  }
}
