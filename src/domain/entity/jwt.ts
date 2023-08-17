
export interface JWTClaims {
  userId: string;
  email: string;
  username: string;
  adminUser: boolean;
}; 

export type JWTToken = string;