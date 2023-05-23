/* eslint-disable @typescript-eslint/no-non-null-assertion */
const dotenv = require('dotenv');

dotenv.config();

export interface ITokenConfig {
  tokenSecret: string;
  tokenExpiresIn: number;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: number;
  tokenIssuer: string;
  tokenAudience: string;
}

export const tokenConfig: ITokenConfig = {
  tokenSecret: process.env.TOKEN_SECRET!,
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN)!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN)!,
  tokenIssuer: process.env.TOKEN_ISSUER!,
  tokenAudience: process.env.TOKEN_AUDIENCE!,
};
