const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const productUpload = require('../middleware/productImageUpload');

router.post('/createProduct', protect, admin, productUpload.array('images', 5), createProduct);

module.exports = router;
