const Product = require("../models/product");


// admin create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      countInStock,
    } = req.body;

    // Map the uploaded files into { public_id, url }
    const images = req.files.map(file => ({
      public_id: file.filename, // Cloudinary gives this as the public_id
      url: file.path,           // Cloudinary secure URL
    }));

    const product = await Product.create({
      name,
      description,
      images,
      category,
      price,
      countInStock,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = 8;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(); // total number of products
    const products = await Product.find()
      .sort({ createdAt: -1 }) // sort by newest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving products',
    });
  }
};

module.exports = { createProduct, getAllProducts };
