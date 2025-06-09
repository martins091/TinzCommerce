const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductCount, getAllProductsPublic } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const productUpload = require('../middleware/productImageUpload');

router.post('/createProduct', protect, admin, productUpload.array('images', 5), createProduct);
router.get('/getProducts', protect, admin, getAllProducts);
router.get('/getProducts/:page', getAllProductsPublic);
router.put('/updateProduct/:id', protect, admin, productUpload.array('images'), updateProduct);
router.delete('/deleteProduct/:id', protect, admin, deleteProduct);
router.get('/admin-get-products-count', protect, admin, getProductCount);

module.exports = router;
