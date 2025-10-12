const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUtils'); // Import the Multer configuration
const { uploadFile } = require('../controllers/uploadController');
const { requireApiKey, protect } = require('../middleware/authMiddleware');

// Use the Multer upload middleware for file upload
router.post('/', requireApiKey, protect, upload.single('file'), uploadFile);

module.exports = router;
