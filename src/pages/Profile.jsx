import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout, updateUser } = useAuth(); 
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (user == null || user.id === '') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Handle Edit Mode
  const handleEditClick = () => {
    setNewName(user.name);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewName('');
  };

  const handleSaveClick = async () => {
    if (newName.trim() !== '') {
      await updateUser({ name: newName }); 
      setIsEditing(false);
    }
  };

  const cardBg = 'dark' ? 'bg-gray-800 shadow-lg shadow-indigo-500/20' : 'bg-white shadow-xl';
  const textMain = 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = 'dark' ? 'text-indigo-300' : 'text-indigo-600';
  const inputBg = 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300';

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
          
          {/* CONDITIONAL RENDERING: EDIT vs VIEW */}
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-80">Edit Name</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={`w-full rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`}
              />
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={handleSaveClick}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelClick}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center group">
              <div>
                <p className="font-semibold flex items-center gap-2">
                  User: {user.name}
                </p>
                <p className="text-sm mt-1">Email: {user.email}</p>
              </div>
              
              {/* Edit Icon Button */}
              <button 
                onClick={handleEditClick}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-200 hover:text-indigo-100"
                title="Edit Name"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            </div>
          )}

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

export default Profile;