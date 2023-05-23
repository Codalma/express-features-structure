import { DomainError, domainErrorsCode } from '@domain/exceptions';

describe('Scenario: Creating a domain error', () => {
  describe('Given an error message', () => {
    const message = 'Invalid request';

    describe('When creating a bad request error', () => {
      const error = DomainError.badRequest(message);

      test('Then it should have the BAD_REQUEST code and the provided message', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
        expect(error.name).toBe('DomainError');
        expect(error.code).toBe(domainErrorsCode.BAD_REQUEST);
        expect(error.message).toBe(message);
      });
    });

    describe('When creating an unauthorized error', () => {
      const error = DomainError.unauthorized(message);

      test('Then it should have the UNAUTHORIZED code and the provided message', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
        expect(error.name).toBe('DomainError');
        expect(error.code).toBe(domainErrorsCode.UNAUTHORIZED);
        expect(error.message).toBe(message);
      });
    });

    describe('When creating a forbidden error', () => {
      const error = DomainError.forbidden(message);

      test('Then it should have the FORBIDDEN code and the provided message', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
        expect(error.name).toBe('DomainError');
        expect(error.code).toBe(domainErrorsCode.FORBIDDEN);
        expect(error.message).toBe(message);
      });
    });

    describe('When creating a not found error', () => {
      const error = DomainError.notFound(message);

      test('Then it should have the NOT_FOUND code and the provided message', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
        expect(error.name).toBe('DomainError');
        expect(error.code).toBe(domainErrorsCode.NOT_FOUND);
        expect(error.message).toBe(message);
      });
    });

    describe('When creating an internal server error', () => {
      const error = DomainError.internalServerError(message);

      test('Then it should have the INTERNAL_SERVER_ERROR code and the provided message', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
        expect(error.name).toBe('DomainError');
        expect(error.code).toBe(domainErrorsCode.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe(message);
      });
    });
  });
});
