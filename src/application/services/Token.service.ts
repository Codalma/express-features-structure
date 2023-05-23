/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITokenService } from '@domain/services';

export class TokenService {
  private tokenService: ITokenService;

  constructor(tokenService: ITokenService) {
    this.tokenService = tokenService;
  }

  generateToken(payload: any): string {
    return this.tokenService.generateToken(payload);
  }

  generateRefreshToken(payload: any): string {
    return this.tokenService.generateRefreshToken(payload);
  }

  decodeToken(token: string): object {
    return this.tokenService.decodeToken(token);
  }

  decodeRefreshToken(token: string): object {
    return this.tokenService.decodeRefreshToken(token);
  }

  async validateToken(token: string): Promise<boolean> {
    return await this.tokenService.validateToken(token);
  }

  async validateRefreshToken(token: string): Promise<boolean> {
    return await this.tokenService.validateRefreshToken(token);
  }
}
