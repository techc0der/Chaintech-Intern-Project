import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {

    const isDark = 'dark';

    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password');
    const { login, profile, user, error, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (user) {
                navigate('/profile');
            }
            else {
                profile();
            }
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            await login({ email, password });
            navigate('/profile');
        } catch (err) {

        }
    }

    const cardBgClass = isDark ? 'bg-gray-800 shadow-xl shadow-indigo-500/10' : 'bg-white shadow-xl shadow-gray-300/50';
    const titleTextClass = isDark ? 'text-white' : 'text-gray-900';
    const labelTextClass = isDark ? 'text-gray-300' : 'text-gray-700';
    const inputBgClass = isDark ?
        'bg-white/5 text-white outline-white/10 placeholder:text-gray-500' :
        'bg-gray-100 text-gray-900 outline-gray-300 placeholder:text-gray-400';
    const inputFocusClass = 'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500';

    return (
        <div className="flex min-h-[calc(100vh-68px)] flex-col justify-center px-6 py-12 lg:px-8">
            <div className={`sm:mx-auto sm:w-full sm:max-w-sm p-8 rounded-xl transition-colors duration-300 ${cardBgClass}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <img
                        src={`https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=${isDark ? '400' : '600'}`}
                        alt="Your Company"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className={`mt-6 text-center text-2xl font-bold tracking-tight transition-colors ${titleTextClass}`}>
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm font-medium bg-red-500/10 text-red-400 rounded-lg border border-red-500">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium ${labelTextClass}`}>
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className={`block w-full rounded-lg px-3 py-2 text-base outline-1 -outline-offset-1 transition-colors ${inputBgClass} ${inputFocusClass} sm:text-sm`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm font-medium ${labelTextClass}`}>
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors" onClick={() => navigate('/reset-password')}>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className={`block w-full rounded-lg px-3 py-2 text-base outline-1 -outline-offset-1 transition-colors ${inputBgClass} ${inputFocusClass} sm:text-sm`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Not a member?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="font-semibold cursor-pointer leading-6 text-indigo-500 hover:text-indigo-400 transition-colors"
                        >
                            Create an account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login