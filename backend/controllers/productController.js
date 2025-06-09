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

    const images = req.files.map(file => ({
      public_id: file.filename,
      url: file.path,
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

// get all products by Admin
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
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

// get all products for public view
const getAllProductsPublic = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // Adjust limit as needed
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find({ countInStock: { $gt: 0 } })
      .sort({ createdAt: -1 })
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
    console.error('Error getting public products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving products',
    });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, category, price, countInStock } = req.body;

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    // Optional: update images if new files uploaded
    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => ({
        public_id: file.filename,
        url: file.path,
      }));
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductCount = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Product count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductCount,
  getAllProductsPublic,
};


// Count total products

