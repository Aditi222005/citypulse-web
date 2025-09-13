import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CityPulse</h1>
          <p className="text-gray-600 mt-2">Your Voice for a Better City</p>
        </div>
        
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 CityPulse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
