const express = require('express');
const router = express.Router();
const { requireApiKey, protect } = require('../middleware/authMiddleware');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/', requireApiKey, getProducts);
router.post('/', requireApiKey, protect, createProduct);
router.get('/:id', requireApiKey, getProduct);
router.put('/:id', requireApiKey, protect, updateProduct);
router.delete('/:id', requireApiKey, protect, deleteProduct);

module.exports = router;
