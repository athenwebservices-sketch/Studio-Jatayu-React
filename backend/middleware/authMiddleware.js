const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const User = require('../models/userModel');

exports.requireApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || key !== jwtConfig.apiKey) {
    return res.status(401).json({ message: 'Invalid or missing API key' });
  }
  next();
};

exports.protect = async (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};
