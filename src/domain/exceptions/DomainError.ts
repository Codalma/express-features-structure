import { domainErrorsCode } from '@domain/exceptions/';

interface IDomainError {
  name: string;
  code: number;
  message: string;
}

export class DomainError extends Error implements IDomainError {
  public readonly name: string;
  public readonly code: number;
  public readonly message: string;

  private constructor(code: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new DomainError(domainErrorsCode.BAD_REQUEST, message);
  }

  static unauthorized(message: string) {
    return new DomainError(domainErrorsCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new DomainError(domainErrorsCode.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new DomainError(domainErrorsCode.NOT_FOUND, message);
  }

  static internalServerError(message: string) {
    return new DomainError(domainErrorsCode.INTERNAL_SERVER_ERROR, message);
  }
}
