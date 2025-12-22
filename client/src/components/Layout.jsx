import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="font-bold text-[#1f4b99]">
                            ULe Academy – Admin
                        </h1>
                        <p className="text-xs text-gray-500">
                            Assessment Monitoring Console
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="text-sm text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-6">
                <Outlet />
            </main>
        </div>
    );
}
