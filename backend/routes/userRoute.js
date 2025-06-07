const express = require('express');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  deleteAccount,
  logout,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  editUserRole,
  deleteUserByAdmin,
  getUserCount
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/profileImageUpload');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);
router.put('/profile-update', protect, upload.single('profileImage'), updateUserProfile);
router.delete('/delete-account', protect, deleteAccount);
router.post('/logout', logout);
router.get('/admin-get-all-users', protect, admin, getAllUsers);
router.put('/admin-edit-user-role/:userId', protect, admin, editUserRole);
router.delete('/admin-delete-user/:userId', protect, admin, deleteUserByAdmin);
router.get('/admin-get-users-count', protect, admin, getUserCount);


module.exports = router;
