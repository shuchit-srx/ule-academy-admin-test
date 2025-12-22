import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: 10000
});

// Attach token on every request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('ule_admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Global response error handling
api.interceptors.response.use(
    response => response,
    error => {
        // No response = network/server down
        if (!error.response) {
            error.message = 'Network error. Please check your connection.';
            return Promise.reject(error);
        }

        const status = error.response.status;

        // Unauthorized → force logout
        if (status === 401) {
            localStorage.clear();
            window.location.href = '/login';
            return;
        }

        // Forbidden
        if (status === 403) {
            error.message = 'You are not authorized to perform this action.';
        }

        // Server error
        if (status >= 500) {
            error.message = 'Server error. Please try again later.';
        }

        return Promise.reject(error);
    }
);

export default api;
