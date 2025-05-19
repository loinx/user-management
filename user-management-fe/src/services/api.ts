import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { ApiError, ApiResponse, RefreshTokenRequest, RefreshTokenResponse } from '../types';

declare global {
    interface ImportMeta {
        env: {
            VITE_API_URL: string;
        };
    }
}

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const request: RefreshTokenRequest = { refreshToken };
                    const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
                        `${API_URL}/api/v1/auth/refresh`,
                        request
                    );
                    
                    const { token, refreshToken: newRefreshToken } = response.data.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';"
};

// Add security headers to all responses
api.interceptors.response.use(
    (response) => {
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers[key] = value;
        });
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class ApiService {
    private api: typeof api;

    constructor() {
        this.api = api;
    }

    private handleError(error: any): ApiError {
        if (error.response?.data) {
            return {
                message: error.response.data.message || 'An error occurred',
                status: error.response.status,
                validationErrors: error.response.data.validationErrors
            };
        }
        return {
            message: 'Network error',
            status: 500
        };
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get<ApiResponse<T>>(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.post<ApiResponse<T>>(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.put<ApiResponse<T>>(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.delete<ApiResponse<T>>(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
}

export const apiService = new ApiService(); 