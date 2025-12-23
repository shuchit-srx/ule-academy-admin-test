import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
    const { login, admin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // If already logged in, never stay on login page
    useEffect(() => {
        if (admin) {
            navigate('/dashboard', { replace: true });
        }
    }, [admin, navigate]);

    const submit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // redirect handled by useEffect when admin updates
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login failed. Please try again.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={submit}
                className="bg-white w-full max-w-sm rounded-2xl p-6 border shadow-sm"
            >
                <h1 className="text-xl font-bold text-[#1f4b99] mb-1">
                    ULe Academy – Admin
                </h1>

                <p className="text-sm text-gray-500 mb-4">
                    Secure administrative access
                </p>

                <input
                    className="w-full mb-1 px-3 py-2 rounded-lg border outline-none focus:border-[#1f4b99]"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                />
                <p className='text-xs mb-2 text-gray-500'>test: admin@uleacademy.in</p>

                <input
                    type="password"
                    className="w-full mb-1 px-3 py-2 rounded-lg border outline-none focus:border-[#1f4b99]"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <p className='text-xs text-gray-500 mb-3'>test: admin123</p>

                {error && (
                    <div className="text-sm text-red-500 mb-2">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#1f4b99] text-white py-2 font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Signing in…
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
}
