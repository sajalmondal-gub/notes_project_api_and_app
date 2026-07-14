import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../features/auth/authService';
import { LoginRequestPayload } from '../features/auth/types';

export interface AuthUserState {
  id: string;
  email: string;
  fullName: string;
  token: string | null;
}

export const useAuth = () => {
  // Enterprise internal core auth states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  /**
   * Application context business processes payload login implementation logic
   */
  const login = async (credentials: LoginRequestPayload): Promise<void> => {
    setAuthLoading(true);
    setAuthError(null);
    try {

      const apiResult = await authApiService.login(credentials);
      if (apiResult.success && apiResult.data.token) {
        await AsyncStorage.setItem('user_token', apiResult.data.token);
        await AsyncStorage.setItem('refresh_token', apiResult.data.refreshToken);
        setIsAuthenticated(true);
      } else {
        throw new Error(apiResult.message || 'Server connection layout failed');
      }
    } catch (networkError: any) {
      const parsedError = networkError?.response?.data?.message || networkError.message || 'Authentication failed';
      setAuthError(parsedError);
      throw new Error(parsedError);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user_token');
      await AsyncStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
    } catch (err) {
      console.warn('Session termination failure:', err);
    }
  };

  return {
    isAuthenticated,
    authLoading,
    authError,
    login,
    logout,
  };
};
