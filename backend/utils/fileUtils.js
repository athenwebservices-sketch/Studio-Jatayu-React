const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);  // Store files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '-'));  // Replace spaces in filename with hyphens
  }
});

// File size limit (e.g., 10MB)
const limits = { fileSize: 10 * 1024 * 1024 };  // 10MB

// File type filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);  // Accept the file
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);  // Reject the file
  }
};

// Set up the upload middleware
const upload = multer({
  storage,
  limits,
  fileFilter
});

module.exports = upload;
