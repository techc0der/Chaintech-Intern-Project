import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VerifyOTP from './VerifyOTP';


const Register = () => {

  const isDark = 'dark';

  const { showOTP, setShowOTP, verifyOtp, sendOTP, otp, setOtp, error, setError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(showOTP, " ", otp);

  async function handleSendOTP(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      console.log('Registering user:', { name, email, password });
      await sendOTP({ email, password, name });
      setShowOTP(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }



  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (otp == null || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      console.log(otp);
      setLoading(true);
      console.log('Verifying OTP for user:', { email, otp });
      await verifyOtp({ email, otp: otp.join('') });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            Create an account
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={showOTP ? handleSubmit : handleSendOTP} className="space-y-6">
            {error && (
              <div className="p-3 text-sm font-medium bg-red-500/10 text-red-400 rounded-lg border border-red-500">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="reg-name" className={`block text-sm font-medium ${labelTextClass}`}>
                Enter your Name
              </label>
              <div className="mt-2">
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className={`block w-full rounded-lg px-3 py-2 text-base outline-1 -outline-offset-1 transition-colors ${inputBgClass} ${inputFocusClass} sm:text-sm`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className={`block text-sm font-medium ${labelTextClass}`}>
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password" className={`block text-sm font-medium ${labelTextClass}`}>
                Password
              </label>
              <div className="mt-2">
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className={`block w-full rounded-lg px-3 py-2 text-base outline-1 -outline-offset-1 transition-colors ${inputBgClass} ${inputFocusClass} sm:text-sm`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${labelTextClass}`}>
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className={`block w-full rounded-lg px-3 py-2 text-base outline-1 -outline-offset-1 transition-colors ${inputBgClass} ${inputFocusClass} sm:text-sm`}
                />
              </div>
            </div>

            {showOTP && <VerifyOTP />}



            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-md transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}`}

              >
                {showOTP ? 'Register' : 'Send OTP'}
              </button>
            </div>
          </form>

          <p className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="font-semibold cursor-pointer leading-6 text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register