const Product = require("../models/product");


const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      category,
      price,
      countInStock,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      images,
      category,
      price,
      countInStock,
      user: req.user._id, // from auth middleware
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct };
