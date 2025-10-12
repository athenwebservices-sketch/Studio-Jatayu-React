const Payment = require('../models/paymentModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createPayment = async (req, res, next) => {
  try {
    const { orderId, productId, amount, method, meta } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount required' });
    let order = null;
    if (orderId) {
      order = await Order.findById(orderId);
      if (!order) return res.status(400).json({ message: 'Order not found' });
    }
    if (productId) {
      const product = await Product.findById(productId);
      if (!product) return res.status(400).json({ message: 'Product not found' });
    }

    const payment = new Payment({
      user: req.user._id,
      order: orderId || null,
      product: productId || null,
      amount,
      method: method || 'card',
      meta: meta || {},
      status: 'completed'
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) { next(err); }
};

exports.getPaymentsForUser = async (req, res, next) => {
  try {
    let payments;
    if (req.user.role === 'customer') {
      payments = await Payment.find({ user: req.user._id }).populate('order product');
    } else {
      payments = await Payment.find().populate('user order product', 'name email');
    }
    res.json(payments);
  } catch (err) { next(err); }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('user order product', 'name email');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    if (req.user.role === 'customer' && payment.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(payment);
  } catch (err) { next(err); }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    if (req.user.role === 'customer') return res.status(403).json({ message: 'Forbidden' });
    Object.assign(payment, req.body);
    await payment.save();
    res.json(payment);
  } catch (err) { next(err); }
};

exports.deletePayment = async (req, res, next) => {
  try {
    if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Only Super Admin can delete payments' });
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (err) { next(err); }
};
