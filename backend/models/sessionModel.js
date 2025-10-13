const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, token: String, lastUsedAt: Date, createdAt: { type: Date, default: Date.now } });
module.exports = mongoose.model('Session', sessionSchema);
