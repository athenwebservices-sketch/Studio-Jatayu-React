const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password -otp -otpExpires');
    res.json(users);
  } catch (err) { next(err); }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.role === 'customer' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const user = await User.findById(id).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.role === 'customer' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const updates = req.body;
    if (updates.role && req.user.role !== 'superadmin') delete updates.role;
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Only Super Admin can delete users' });
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};
