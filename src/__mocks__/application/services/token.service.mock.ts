import { ITokenService } from '@domain/services';

export const tokenServiceMock: ITokenService = {
  generateToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  decodeToken: jest.fn(),
  decodeRefreshToken: jest.fn(),
  validateToken: jest.fn(),
  validateRefreshToken: jest.fn(),
};
