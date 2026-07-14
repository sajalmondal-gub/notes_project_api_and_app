import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../features/auth/authService';
import { LoginRequestPayload } from '../features/auth/types';

export interface AuthUserState {
  id: string;
  email: string;
  fullName: string;
  token: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  login: (credentials: LoginRequestPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Enterprise internal core auth states shared globally via React Context
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  /**
   * Check for stored token on mount to restore user session
   */
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('user_token');
        if (userToken) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.warn('Session restoration failure:', err);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLoading,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
