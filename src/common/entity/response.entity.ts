import { HttpErrorResponseDto } from '../dto/http-error-response.dto';

export class ResponseEntity<T> {
  private readonly statusCode: number;
  private readonly headers: Record<string, string> = {};
  private body: null | T = null;
  private message: string = 'Operation successfully';

  constructor(statusCode: number) {
    this.statusCode = statusCode;
  }

  public static status<T>(statusCode: number): ResponseEntity<T> {
    return new ResponseEntity<T>(statusCode);
  }

  public static ok<T>(body?: T): ResponseEntity<T> {
    const entity = new ResponseEntity<T>(200);
    entity.body = body;
    return entity;
  }

  public static created<T>(body?: T): ResponseEntity<T> {
    const entity = new ResponseEntity<T>(201);
    entity.body = body;
    return entity;
  }

  public static noContent<T>(): ResponseEntity<T> {
    return new ResponseEntity<T>(204);
  }

  public static error<T>(
    statusCode: number,
    message: string,
    details?: any,
  ): HttpErrorResponseDto<T> {
    return new HttpErrorResponseDto<T>(statusCode, message, details);
  }

  public setBody(body: T): ResponseEntity<T> {
    this.body = body;
    return this;
  }

  public setHeader(key: string, value: string): ResponseEntity<T> {
    this.headers[key] = value;
    return this;
  }

  public setMessage(message: string): ResponseEntity<T> {
    this.message = message;
    return this;
  }

  public build(): {
    body: null | T;
    headers: Record<string, string>;
    statusCode: number;
    message: string;
  } {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body,
      message: this.message,
    };
  }
}
