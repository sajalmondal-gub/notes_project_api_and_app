import { apiClient } from '../../services/api/axios';
import {
  LoginRequestPayload,
  AuthResponse,
  RegisterRequestPayload,
  User,
} from './types';

export const authApiService = {
  login: async (payload: LoginRequestPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  register: async (payload: RegisterRequestPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      payload,
    );
    return response.data;
  },
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
