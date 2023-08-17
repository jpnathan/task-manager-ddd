import { JWTClaims, JWTToken } from './jwt';

export interface IAuthService {
  signJWT (props: JWTClaims): JWTToken;
  decodeJWT (token: string): Promise<JWTClaims>;
}