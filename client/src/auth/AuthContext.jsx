import { createContext, useContext, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(
        JSON.parse(localStorage.getItem('ule_admin_user'))
    );

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('ule_admin_token', data.token);
        localStorage.setItem('ule_admin_user', JSON.stringify(data.admin));
        setAdmin(data.admin);
    };

    const logout = () => {
        localStorage.clear();
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
