const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','completed','failed','refunded'], default: 'pending' },
  method: { type: String, default: 'card' },
  meta: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
