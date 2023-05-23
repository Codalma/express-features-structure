/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITokenService {
  generateToken(payload: any): string;
  generateRefreshToken(payload: any): string;
  decodeToken(token: string): object;
  decodeRefreshToken(token: string): object;
  validateToken(token: string): Promise<boolean>;
  validateRefreshToken(token: string): Promise<boolean>;
}
