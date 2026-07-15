import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL as ENV_API_BASE_URL } from '@env';

const API_BASE_URL = ENV_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});


apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('user_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration (401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                await AsyncStorage.removeItem('user_token');
                await AsyncStorage.removeItem('refresh_token');
                // Log the redirection trigger / session expiration
                console.warn('Session expired. Cleaned up tokens.');
            } catch (storageErr) {
                console.warn('Error clearing credentials on session expiration:', storageErr);
            }
        }
        return Promise.reject(error);
    }
);