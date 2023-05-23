import { JWTLibrary } from '@infrastructure/libraries';

const jwt = require('jsonwebtoken');

describe('Scenario : JWT library tests suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const jwtSignMock = jest.spyOn(jwt, 'sign');
  const jwtVerifyMock = jest.spyOn(jwt, 'verify');

  const tokenMock = 'mocked token';
  const refreshTokenMock = 'mocked refresh token';

  const tokenConfig = {
    tokenSecret: 'secret',
    tokenExpiresIn: 3600,
    refreshTokenSecret: 'refreshSecret',
    refreshTokenExpiresIn: 86400,
    tokenIssuer: 'issuer',
    tokenAudience: 'audience',
  };

  const payload = {
    name: 'John Doe',
  };

  const jwtLibrary = new JWTLibrary(tokenConfig);

  describe('Given a JWT library implementation', () => {
    describe('WWhen calling the generateToken method with a payload', () => {
      test('T Then it should sign the payload with the token secret', () => {
        // Act
        jwtLibrary.generateToken(payload);

        // Assert
        expect(jwtSignMock).toHaveBeenCalledTimes(1);
        expect(jwtSignMock).toHaveBeenCalledWith(
          payload,
          tokenConfig.tokenSecret,
          {
            expiresIn: tokenConfig.tokenExpiresIn,
            issuer: tokenConfig.tokenIssuer,
            audience: tokenConfig.tokenAudience,
          }
        );
      });

      test('Then it should return the token', () => {
        // Arrange
        jwtSignMock.mockReturnValue(tokenMock);

        // Act
        const token = jwtLibrary.generateToken(payload);

        // Assert
        expect(token).toBe(tokenMock);
      });
    });

    describe('When calling the generateRefreshToken method with a payload', () => {
      test('Then it should sign the payload with the refresh token secret', () => {
        // Act
        jwtLibrary.generateRefreshToken(payload);

        // Assert
        expect(jwtSignMock).toHaveBeenCalledTimes(1);
        expect(jwtSignMock).toHaveBeenCalledWith(
          payload,
          tokenConfig.refreshTokenSecret,
          {
            expiresIn: tokenConfig.refreshTokenExpiresIn,
            issuer: tokenConfig.tokenIssuer,
            audience: tokenConfig.tokenAudience,
          }
        );
      });

      test('Then it should return the refresh token', () => {
        // Arrange
        const refreshTokenMock = 'refresh token mock';
        jwtSignMock.mockReturnValue(refreshTokenMock);

        // Act
        const refreshToken = jwtLibrary.generateRefreshToken(payload);

        // Assert
        expect(refreshToken).toBe(refreshTokenMock);
      });
    });

    describe('When calling the decodeToken method with an invalid token', () => {
      test('Then it should throw an error with a message', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation(() => {
          throw new Error('Error in verify process.');
        });

        try {
          // Act
          await jwtLibrary.decodeToken(tokenMock);
        } catch (error) {
          // Assert
          await expect(jwtLibrary.decodeToken(tokenMock)).rejects.toThrow(
            Error
          );
          await expect(jwtLibrary.decodeToken(tokenMock)).rejects.toThrowError(
            'Error in token validation process.'
          );
        }
      });
    });

    describe('When calling the decodeToken method with valid token and secret', () => {
      test('Then it should decode the token with the token secret', async () => {
        // Arrange
        const decodedResultMock = 'decoded result mock';
        jwtVerifyMock.mockReturnValue(decodedResultMock);

        // Act
        await jwtLibrary.decodeToken(tokenMock);

        // Assert
        expect(jwtVerifyMock).toHaveBeenCalledTimes(1);
        expect(jwtVerifyMock).toHaveBeenCalledWith(
          tokenMock,
          tokenConfig.tokenSecret
        );
      });

      test('Then it should return the decoded token result', async () => {
        // Arrange
        const mockedDecoded = 'mocked decoded';

        jwtVerifyMock.mockReturnValue(mockedDecoded);

        // Act
        const decoded = await jwtLibrary.decodeToken(mockedDecoded);

        // Assert
        expect(decoded).toBe(mockedDecoded);
      });
    });

    describe('When calling the decodeRefreshToken method and an error occurred', () => {
      test('Then it should throw an error with a message', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation(() => {
          throw new Error('Error in verify process.');
        });

        try {
          // Act
          await jwtLibrary.decodeRefreshToken(tokenMock);
        } catch (error) {
          // Assert
          await expect(
            jwtLibrary.decodeRefreshToken(tokenMock)
          ).rejects.toThrow(Error);
          await expect(
            jwtLibrary.decodeRefreshToken(tokenMock)
          ).rejects.toThrowError('Error in refresh token validation process.');
        }
      });
    });

    describe('When calling the decodeRefreshToken method with valid refresh token and refresh secret', () => {
      test('Then it should verify the refresh token with the refresh token secret', async () => {
        // Arrange
        const decodedResultMock = 'decoded result mock';
        jwtVerifyMock.mockReturnValue(decodedResultMock);

        // Act
        await jwtLibrary.decodeRefreshToken(refreshTokenMock);

        // Assert
        expect(jwtVerifyMock).toHaveBeenCalledTimes(1);
        expect(jwtVerifyMock).toHaveBeenCalledWith(
          refreshTokenMock,
          tokenConfig.refreshTokenSecret
        );
      });

      test('Then it should return the decoded token result', async () => {
        // Arrange
        const mockedDecoded = 'mocked decoded';

        jwtVerifyMock.mockReturnValue(mockedDecoded);

        // Act
        const decoded = await jwtLibrary.decodeRefreshToken(mockedDecoded);

        // Assert
        expect(decoded).toBe(mockedDecoded);
      });
    });

    describe('When calling the validateToken method with an invalid token', () => {
      test('Then it should throw an error with a message', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation(() => {
          throw new Error('Error in verify process.');
        });

        let isValid;

        // Act and assert
        try {
          isValid = await jwtLibrary.validateToken(tokenMock);
        } catch (error) {
          await expect(jwtLibrary.validateToken(tokenMock)).rejects.toThrow(
            Error
          );
          expect(isValid).toBe(false);
        }
      });
    });

    describe('When calling the validateToken method with a valid token', () => {
      test('Then it should validate the token with the token secret', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation();

        // Act
        const isValid = await jwtLibrary.validateToken(tokenMock);

        // Assert
        expect(isValid).toBe(true);
      });
    });

    describe('When calling the validateRefreshToken method with an invalid token', () => {
      test('Then it should throw an error with a message', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation(() => {
          throw new Error('Error in verify process.');
        });

        let isValid;

        // Act and assert
        try {
          isValid = await jwtLibrary.validateRefreshToken(tokenMock);
        } catch (error) {
          await expect(
            jwtLibrary.validateRefreshToken(tokenMock)
          ).rejects.toThrow(Error);
          expect(isValid).toBe(false);
        }
      });
    });

    describe('When calling the validateRefreshToken method with a valid refresh token', () => {
      test('Then it validate the refresh token with the refresh token secret', async () => {
        // Arrange
        jwtVerifyMock.mockImplementation();

        // Act
        const isValid = await jwtLibrary.validateRefreshToken(tokenMock);

        // Assert
        expect(isValid).toBe(true);
      });
    });
  });
});
