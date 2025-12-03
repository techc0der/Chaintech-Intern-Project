import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { use } from 'react';

const VerifyOTP = ({ isDark, labelTextClass, inputBgClass, inputFocusClass }) => {
    const { otp, setOtp } = useAuth();
    const inputRefs = useRef([]);
    useEffect(() => {
        setOtp(Array(6).fill(''));
    }, []);

    if (!Array.isArray(otp)) return null;

    const handleKeyDown = (e) => {
        const key = e.key;
        const target = e.target;
        const index = inputRefs.current.indexOf(target);

        if (!/^[0-9]$/.test(key) && key !== "Backspace" && key !== "Delete" && key !== "Tab" && !e.metaKey && !e.ctrlKey && !/^Arrow/.test(key)) {
            e.preventDefault();
            return;
        }

        if (key === "Backspace" || key === "Delete") {
            e.preventDefault();
            setOtp(prev => {
                const copy = [...prev];
                copy[index] = '';
                return copy;
            });
            if (index > 0) inputRefs.current[index - 1]?.focus();
        }

        if (key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
        if (key === "ArrowRight" && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleInput = (e) => {
        const target = e.target;
        const index = inputRefs.current.indexOf(target);
        let val = (target.value || '').replace(/\D/g, '').slice(-1);

        if (!val) {
            setOtp(prev => {
                const copy = [...prev];
                copy[index] = '';
                return copy;
            });
            return;
        }

        setOtp(prev => {
            const copy = [...prev];
            copy[index] = val;
            return copy;
        });

        if (index < otp.length - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleFocus = (e) => e.target.select();

    const handlePaste = (e) => {
        e.preventDefault();
        const text = (e.clipboardData.getData("text") || '').replace(/\D/g, '');
        if (!text) return;
        const digits = text.split('').slice(0, otp.length);
        const newOtp = Array.from({ length: otp.length }, (_, i) => digits[i] ?? '');
        setOtp(newOtp);
        const firstEmpty = newOtp.findIndex(d => d === '');
        const idxToFocus = firstEmpty === -1 ? newOtp.length - 1 : firstEmpty;
        inputRefs.current[idxToFocus]?.focus();
    };

    const otpInputClasses = `w-10 h-10 text-center text-xl rounded-lg border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors ${isDark
            ? 'bg-white/5 text-white border-gray-600'
            : 'bg-gray-100 text-gray-900 border-gray-300'
        }`;

    return (
        <section className="py-2">
            <p className={`mb-1.5 text-sm font-medium ${labelTextClass}`}>Secure code</p>

            <div id="otp-form" className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className={otpInputClasses}
                        aria-label={`OTP digit ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default VerifyOTP;

