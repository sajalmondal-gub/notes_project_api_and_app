import { ApiResponse } from '../../types';

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface RegisterRequestPayload {
  first_name: string;
  last_name:string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthTokenData {
  token: string;
  refreshToken: string;
  user: User;
}

export type AuthResponse = ApiResponse<AuthTokenData>;
