import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  useEffect(() => {
    if (user == null || user.id === '') {
      navigate('/login');
    }
  }, [user, navigate]);

  const cardBg = 'dark' ? 'bg-gray-800 shadow-lg shadow-indigo-500/20' : 'bg-white shadow-xl';
  const textMain = 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = 'dark' ? 'text-indigo-300' : 'text-indigo-600';

  const logoutHandler = () => {
    logout();
    navigate('/login');
  }

  if (!user || user.id === '') {
    return null;
  }

  return (

    <div className="p-8 flex justify-center items-start min-h-[calc(100vh-68px)]">
      <div className={`p-8 rounded-xl w-full max-w-md transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-3xl font-bold mb-4 ${textMain}`}>PROFILE</h2>
        <p className={`text-lg mb-6 ${textSecondary}`}>
          Welcome Back!
        </p>
        <div className={`border-l-4 border-indigo-500 pl-4 py-2 my-4 ${textMain}`}>
          <p className="font-semibold">User: {user.name}</p>
          <p className="text-sm">Email: {user.email}</p>
        </div>
        <button
          onClick={logoutHandler}
          className="mt-4 w-full justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile