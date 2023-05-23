/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITokenService } from '@domain/services';
import { ITokenConfig } from '@infrastructure/configs';

const jwt = require('jsonwebtoken');

export class JWTLibrary implements ITokenService {
  private readonly tokenSecret: string;
  private readonly tokenExpiresIn: number;
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenExpiresIn: number;
  private readonly tokenIssuer: string;
  private readonly tokenAudience: string;

  constructor(tokenConfig: ITokenConfig) {
    this.tokenSecret = tokenConfig.tokenSecret;
    this.tokenExpiresIn = tokenConfig.tokenExpiresIn;
    this.refreshTokenSecret = tokenConfig.refreshTokenSecret;
    this.refreshTokenExpiresIn = tokenConfig.refreshTokenExpiresIn;
    this.tokenIssuer = tokenConfig.tokenIssuer;
    this.tokenAudience = tokenConfig.tokenAudience;
  }

  public generateToken(payload: any) {
    return jwt.sign(payload, this.tokenSecret, {
      expiresIn: this.tokenExpiresIn,
      issuer: this.tokenIssuer,
      audience: this.tokenAudience,
    });
  }

  public generateRefreshToken(payload: any) {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
      issuer: this.tokenIssuer,
      audience: this.tokenAudience,
    });
  }

  public async decodeToken(token: string) {
    try {
      const decoded = await jwt.verify(token, this.tokenSecret);

      return decoded;
    } catch (error: any) {
      throw new Error('Error in token validation process.');
    }
  }

  public async decodeRefreshToken(token: string) {
    try {
      const decoded = await jwt.verify(token, this.refreshTokenSecret);

      return decoded;
    } catch (error: any) {
      throw new Error('Error in refresh token validation process.');
    }
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      await jwt.verify(token, this.tokenSecret);
      return true;
    } catch (error: any) {
      return false;
    }
  }

  public async validateRefreshToken(token: string): Promise<boolean> {
    try {
      await jwt.verify(token, this.refreshTokenSecret);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}
