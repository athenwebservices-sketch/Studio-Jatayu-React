const express = require('express');
const router = express.Router();
const { requireApiKey, protect } = require('../middleware/authMiddleware');
const { createOrder, getOrdersForUser, getOrder, updateOrderStatus } = require('../controllers/orderController');

router.post('/', requireApiKey, protect, createOrder);
router.get('/', requireApiKey, protect, getOrdersForUser);
router.get('/:id', requireApiKey, protect, getOrder);
router.put('/:id/status', requireApiKey, protect, updateOrderStatus);

module.exports = router;
