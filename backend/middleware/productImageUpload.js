const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tinzcommerce/products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

const productUpload = multer({ storage: productStorage });

module.exports = productUpload;
