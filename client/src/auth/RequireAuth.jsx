import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children }) {
    const { admin } = useAuth();
    return admin ? children : <Navigate to="/login" />;
}
