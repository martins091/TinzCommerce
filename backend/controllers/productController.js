const Product = require("../models/product");

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

module.exports = { createProduct };
