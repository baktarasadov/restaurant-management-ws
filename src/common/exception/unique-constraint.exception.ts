import { HttpException, HttpStatus } from '@nestjs/common';

export class UniqueConstraintException extends HttpException {
  constructor(name: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${name} already exists.`,
        error: 'Unique Constraint Error',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
