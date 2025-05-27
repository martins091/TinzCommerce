const express = require('express');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  deleteAccount,
  logout,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const { updateUserProfile } = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userController');
const { getAllUsers } = require('../controllers/userController');
const upload = require('../middleware/upload');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);
router.put('/profile-update', protect, upload.single('profileImage'), updateUserProfile);
router.delete('/delete-account', protect, deleteAccount);
router.post('/logout', logout);
router.get('/all-users', protect, admin, getAllUsers);


 
module.exports = router;
