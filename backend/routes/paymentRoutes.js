const express = require('express');
const router = express.Router();
const { requireApiKey, protect } = require('../middleware/authMiddleware');
const { createPayment, getPaymentsForUser, getPayment, updatePayment, deletePayment } = require('../controllers/paymentController');

router.post('/', requireApiKey, protect, createPayment);
router.get('/', requireApiKey, protect, getPaymentsForUser);
router.get('/:id', requireApiKey, protect, getPayment);
router.put('/:id', requireApiKey, protect, updatePayment);
router.delete('/:id', requireApiKey, protect, deletePayment);

module.exports = router;
