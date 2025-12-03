import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../lib/api';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({
        name: '', email: '', id: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [showOTP, setShowOTP] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    if (mounted) setLoading(false);
                    return;
                }

                setAuthToken(token);

                const res = await api.get('/api/profile');
                if (mounted) {
                    setUser(res.data.user || null);
                }
            } catch (err) {
                console.warn('Auto-login failed, clearing token', err?.response?.status || err);
                localStorage.removeItem('token');
                setAuthToken(null);
                if (mounted) setUser(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; };
    }, []);



    async function resetPassword({ email, otpString, password }) {
        console.log(email, otpString, password);
        try {
            const res = await api.post('/api/auth/reset-password', { email, otp: otpString, newPassword: password });
            return res.data;
        } catch (error) {
            setError(error?.response?.data?.message || error.message || 'Password reset failed');
            throw error;
        }
    }

    async function requestPasswordReset({ email }) {
        try {
            const res = await api.post('/api/auth/request-password-reset', { email });
            setShowOTP(true);

        } catch (error) {
            setError(error?.response?.data?.message || error.message || 'Password reset request failed');
            throw error;
        }
    }

    async function resendOtp({ email, password, name }) {
        try {
            const res = await api.post('/api/auth/resend-otp', { email });
            if (res.status !== 404 || !res.data.user) {
                setShowOTP(true);
                setOtp(Array(6).fill(''));
            }
            return res.data;
        } catch (err) {
            const message = err?.response?.data?.message || err.message || 'Failed to send OTP';
            throw new Error(message);
        }
    }

    async function login({ email, password }) {
        setError(null);
        try {
            const res = await api.post('/api/auth/login', { email, password });
            const { token, user } = res.data;
            if (!token) throw new Error('No token returned from server');
            localStorage.setItem('token', token);
            setAuthToken(token);
            setUser(user ?? null);
            return { ok: true };
        } catch (err) {
            console.error('login error', err);
            setError(err?.response?.data?.message || err.message || 'Login failed');
            throw err;
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    }

    async function profile() {
        try {
            const res = await api.get("/api/profile");

            if (!res.data || !res.data.user) {
                throw new Error("Invalid profile response");
            }

            setUser({
                id: res.data.user.id || res.data.user._id || '',
                name: res.data.user.name || '',
                email: res.data.user.email || ''
            });

            localStorage.setItem("auth_user", JSON.stringify(res.data.user));

            return res.data.user;
        } catch (error) {
            console.error("Profile error:", error?.response?.data || error.message);

            if (error?.response?.status === 401) {
                setUser(null);
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }

            throw error;
        }
    }


    async function sendOTP(payload) {
        try {
            const res = await api.post('/api/auth/register', payload);
            if (res.status !== 409 || !res.data.user) {
                setShowOTP(true);
                setOtp(Array(6).fill(''));
            }
            return res.data;
        } catch (err) {
            const message = err?.response?.data?.message || err.message || 'Failed to send OTP';
            throw new Error(message);
        }
    }

    async function verifyOtp({ email, otp }) {
        try {
            const res = await api.post('/api/auth/verify-otp', { email, otp });
            return res.data;
        } catch (err) {
            const message = err?.response?.data?.message || err.message || 'Failed to verify OTP';
            throw new Error(message);
        }
    }



    const value = useMemo(() => ({
        user,
        loading,
        error,
        setError,
        login,
        otp,
        setOtp,
        showOTP,
        profile,
        setShowOTP,
        logout,
        sendOTP,
        resendOtp,
        verifyOtp,
        requestPasswordReset,
        resetPassword,
        isAuthenticated: Boolean(user),
    }), [user, loading, error, otp, showOTP]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}