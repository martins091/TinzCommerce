import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccountThunk, updateProfileThunk } from '../../features/user/userThunks';
import { logout } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/modal/confirmModal';
import SuccessModal from '../../components/modal/SuccessModal';


export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const storedUser = localStorage.getItem('userInfo');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const user = parsedUser?.user || null;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(user?.profileImage || '');

  const fileInputRef = useRef(null);

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
    }, 1500);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

const confirmDelete = async () => {
  setLoading(true);
  try {
    await dispatch(deleteAccountThunk()).unwrap();
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    // Remove the auto logout for now or delay it
    // setTimeout(() => {
    //   handleLogout();
    // }, 2000);
  } catch (error) {
    setShowConfirmModal(false);
    setShowErrorModal(true);
  } finally {
    setLoading(false);
  }
};



  const handleUpdateProfile = async () => {
    const updatedUserData = {
      name,
      email,
      phone,
      location,
      bio,
      profileImage, // assuming your backend supports file uploads
    };

    try {
      const updatedUser = await dispatch(updateProfileThunk(updatedUserData)).unwrap();
      localStorage.setItem('userInfo', JSON.stringify({ user: updatedUser }));
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Profile update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-8 flex flex-col items-center">
          <img
            src={profileImagePreview || 'https://i.pravatar.cc/150?img=15'}
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
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="mt-1 text-gray-900 font-semibold">{name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="mt-1 text-gray-900 font-semibold">{email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="mt-1 text-gray-900 font-semibold">{phone || 'N/A'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="mt-1 text-gray-900 font-semibold">{location || 'N/A'}</p>
              )}
            </div>
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
                  Save Changes
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
                className={`px-6 py-2 rounded-lg text-white ${logoutLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {logoutLoading ? 'Logging Out...' : 'Logout'}
              </button>

              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                Delete Account
              </button>
            {showSuccessModal && console.log('Rendering SuccessModal')}
<SuccessModal
  isOpen={showSuccessModal}
  onClose={() => {
    setShowSuccessModal(false);
    handleLogout();
  }}
  title="Account Deleted"
  message="Your account has been deleted successfully."
/>



              <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete your account?"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
