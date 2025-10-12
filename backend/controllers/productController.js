const Product = require('../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, imageUrls } = req.body;
    const product = new Product({ name, description, price, imageUrls: imageUrls || [], createdBy: req.user._id });
    await product.save();
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('createdBy', 'email name role');
    res.json(products);
  } catch (err) { next(err); }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'email name role');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (req.user.role === 'customer' && product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (req.user.role === 'customer' && product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) { next(err); }
};
