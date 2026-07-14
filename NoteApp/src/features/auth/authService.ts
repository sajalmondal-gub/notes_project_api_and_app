import { apiClient } from '../../services/api/axios';
import { LoginRequestPayload, AuthResponse } from './types';

export const authApiService = {
    login: async (payload: LoginRequestPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', payload);
        return response.data;
    },

    register: async (payload: any): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', payload);
        return response.data;
    }
};