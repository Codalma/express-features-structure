import { ITokenService } from '@domain/services';
import { TokenService } from '@application/services';
import { tokenServiceMock } from '@mocks/application/services/token.service.mock';

describe('Scenario: TokenService tests suite', () => {
  let tokenService: ITokenService;
  const payload = 'payload';
  const token = 'token';

  beforeEach(() => {
    tokenService = new TokenService(tokenServiceMock);
  });

  describe('Given a token service', () => {
    test('Then the token service should be defined', () => {
      expect(tokenService).toBeDefined();
    });

    describe('When calling generateToken method with payload', () => {
      beforeEach(() => {
        tokenService.generateToken(payload);
      });

      test('Then the token service should call the generateToken method with payload', () => {
        expect(tokenServiceMock.generateToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.generateToken).toHaveBeenCalledWith(payload);
      });
    });

    describe('When calling generateRefreshToken method with payload', () => {
      beforeEach(() => {
        tokenService.generateRefreshToken(payload);
      });

      test('Then the token service should call the generateRefreshToken method with payload', () => {
        expect(tokenServiceMock.generateRefreshToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.generateRefreshToken).toHaveBeenCalledWith(
          payload
        );
      });
    });

    describe('When calling decodeToken method with token', () => {
      beforeEach(() => {
        tokenService.decodeToken(token);
      });

      test('Then the token service should call the decodeToken method with token', () => {
        expect(tokenServiceMock.decodeToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.decodeToken).toHaveBeenCalledWith(token);
      });
    });

    describe('When calling decodeRefreshToken method with token', () => {
      beforeEach(() => {
        tokenService.decodeRefreshToken(token);
      });

      test('Then the token service should call the decodeRefreshToken method with token', () => {
        expect(tokenServiceMock.decodeRefreshToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.decodeRefreshToken).toHaveBeenCalledWith(token);
      });
    });

    describe('When calling validateToken method with token', () => {
      beforeEach(() => {
        tokenService.validateToken(token);
      });

      test('Then the token service should call the validateToken method with token', () => {
        expect(tokenServiceMock.validateToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.validateToken).toHaveBeenCalledWith(token);
      });
    });

    describe('When calling validateRefreshReToken method with token', () => {
      beforeEach(() => {
        tokenService.validateRefreshToken(token);
      });

      test('Then the token service should call the validateRefreshToken method with token', () => {
        expect(tokenServiceMock.validateRefreshToken).toHaveBeenCalledTimes(1);
        expect(tokenServiceMock.validateRefreshToken).toHaveBeenCalledWith(
          token
        );
      });
    });
  });
});
