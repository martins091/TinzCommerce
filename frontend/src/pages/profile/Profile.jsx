import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, deleteAccountThunk } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const storedUser = localStorage.getItem('userInfo');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const user = parsedUser ? parsedUser.user : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 bg-gray-100">
        <p className="text-xl">No user data available. Please sign in.</p>
      </div>
    );
  }

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      dispatch(logout());
      navigate('/signin');
    }, 1500); // mimic logout delay
  };


  const confirmDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteAccountThunk()).unwrap(); // use unwrap to catch errors directly
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        handleLogout(); // Log out after account deletion
      }, 2000);
    } catch (error) {
      setShowConfirmModal(false);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-8 flex flex-col items-center">
          <img
            src={user.avatar || 'https://i.pravatar.cc/150?img=15'}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
          />
          <h2 className="text-2xl font-semibold">{user.name || 'Anonymous User'}</h2>
          <p className="text-blue-300 mt-1">{user.role || 'User'}</p>
          <p className="text-blue-200 text-sm mt-2">Joined {user.joined || 'Recently'}</p>
        </div>

        {/* Right Panel */}
        <div className="md:w-2/3 p-8 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email Address</label>
              <p className="mt-1 text-gray-900 font-semibold">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              <p className="mt-1 text-gray-900 font-semibold">{user.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Location</label>
              <p className="mt-1 text-gray-900 font-semibold">{user.location || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Member Since</label>
              <p className="mt-1 text-gray-900 font-semibold">{user.joined || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">About</h4>
            <p className="text-gray-600 leading-relaxed">
              {user.bio ||
                `This user hasn't added a bio yet. Add one from your profile settings to tell others more about yourself.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`px-6 py-2 rounded-lg transition text-white ${logoutLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                }`}
            >
              {logoutLoading ? (
  <span className="flex items-center">
    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    Logging out...
  </span>
) : (
  'Logout'
)}

            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={loading}
              className={`px-6 py-2 rounded-lg transition text-white ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
                }`}
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Account deleted successfully.</h2>
            <p className="text-gray-600 text-sm">Redirecting you...</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error deleting account.</h2>
            <p className="text-gray-600 text-sm">Please try again later.</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
