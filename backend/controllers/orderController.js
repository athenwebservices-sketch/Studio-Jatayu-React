const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' });

    let total = 0;
    const detailedItems = [];

    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) return res.status(400).json({ message: 'Product not found: ' + it.product });
      const priceAtPurchase = product.price;
      total += priceAtPurchase * (it.quantity || 1);
      detailedItems.push({ product: product._id, quantity: it.quantity || 1, priceAtPurchase });
    }

    const order = new Order({ user: req.user._id, items: detailedItems, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) { next(err); }
};

exports.getOrdersForUser = async (req, res, next) => {
  try {
    let orders;
    if (req.user.role === 'customer') {
      orders = await Order.find({ user: req.user._id }).populate('items.product');
    } else {
      orders = await Order.find().populate('items.product user', 'name email');
    }
    res.json(orders);
  } catch (err) { next(err); }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role === 'customer' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(order);
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role === 'customer') return res.status(403).json({ message: 'Forbidden' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) { next(err); }
};
