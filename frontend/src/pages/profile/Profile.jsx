import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccountThunk, updateProfileThunk, getUserProfileThunk } from '../../features/user/userThunks';
import { logoutUser } from '../../features/user/userSlice';
import { setUserInfoToStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/modal/SuccessModal';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const [accountUpdating, setAccountUpdating] = useState(false);

  const fileInputRef = useRef(null);

  const user = useSelector((state) => state.user.userInfo);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetchingProfile(true);
        await dispatch(getUserProfileThunk()).unwrap();
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setFetchingProfile(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // Update local state when user is available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setProfileImagePreview(user.profileImage || '');
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (profileImagePreview && profileImage) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview, profileImage]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      dispatch(logoutUser());
      navigate('/signin');
    }, 1500);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (!modalError && user) {
      setEmail('');
      navigate('/signin');
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await dispatch(deleteAccountThunk()).unwrap();
      dispatch(logoutUser());
      setModalMessage('Account Deleted successfully!');
      setModalError(false);
      setModalOpen(true);
    } catch (error) {
      setModalMessage(typeof error === 'string' ? error : error.message || 'Deletion failed');
      setModalError(true);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const updatedUser = await dispatch(updateProfileThunk(formData)).unwrap();
      dispatch({ type: 'user/updateUserInfo', payload: updatedUser });
      setUserInfoToStorage(updatedUser);
      setIsEditing(false);
      setModalMessage('User updated successfully!');
      setModalError(false);
      setModalOpen(true);
    } catch (error) {
      setModalMessage(typeof error === 'string' ? error : error.message || 'Update failed');
      setModalError(true);
      setModalOpen(true);
    } finally {
      setAccountUpdating(false);
    }
  };

  if (fetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 bg-gray-100">
        <p className="text-xl">No user data available. Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-8 flex flex-col items-center">
          <img
            src={profileImagePreview || user.profileImage || 'https://i.pravatar.cc/150?img=15'}
            alt="User Profile"
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6 cursor-pointer"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block text-center px-3 py-2 rounded bg-white text-blue-700 font-semibold"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{name}</h2>
          )}
          <p className="text-blue-300 mt-1">{user.role || 'User'}</p>
          <p className="text-blue-200 text-sm mt-2">Joined {user.joined || 'Recently'}</p>
        </div>

        {/* Right Panel */}
        <div className="md:w-2/3 p-8 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ['Name', name, setName],
              ['Email Address', email, setEmail],
              ['Phone Number', phone, setPhone],
              ['Location', location, setLocation],
            ].map(([label, value, setter], i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-500">{label}</label>
                {isEditing ? (
                  <input
                    type={label === 'Email Address' ? 'email' : 'text'}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-semibold">{value || 'N/A'}</p>
                )}
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">About</h4>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded"
                rows="4"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {bio || `This user hasn't added a bio yet.`}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 mt-8">
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  onClick={handleUpdateProfile}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {accountUpdating ? 'Saving Changes...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setName(user.name || '');
                    setEmail(user.email || '');
                    setPhone(user.phone || '');
                    setLocation(user.location || '');
                    setBio(user.bio || '');
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className={`px-6 py-2 rounded-lg text-white ${
                  logoutLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {logoutLoading ? 'Logging Out...' : 'Logout'}
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading ? 'bg-black/50' : 'bg-black hover:bg-gray-800'
                }`}
              >
                {loading ? 'Deleting Account...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={modalOpen}
        onClose={closeModal}
        isError={modalError}
        message={modalMessage}
      />
    </div>
  );
}
