import { AuthProvider } from '../auth/AuthContext';

export default function Providers({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
