const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    let finalRole = 'customer';
    if (role && role !== 'customer') {
      const creatorRole = req.headers['x-creator-role'];
      if (creatorRole !== 'superadmin') {
        return res.status(403).json({ message: 'Only Super Admin can create non-customer users' });
      }
      finalRole = role;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10*60*1000);

    const user = new User({ name, email, password, role: finalRole, otp, otpExpires, isVerified: false });
    await user.save();

    console.log('==== Registration OTP for', email, 'is:', otp, ' (valid for 10 minutes) ====');

    return res.status(201).json({ message: 'User created. Check server console for OTP to verify.',otp });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    if (!user.otp || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP expired' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = signToken(user);
    return res.status(200).json({ message: 'Verified', token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified)
      return res.status(400).json({ message: 'Account not verified. Please verify OTP.' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user);

    // ✅ Final response structure
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }

};
