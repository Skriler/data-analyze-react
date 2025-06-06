import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.API_URL || '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        // TODO: get token
        const token = '';

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },

    (error: AxiosError) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const publicApiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.API_URL || '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});