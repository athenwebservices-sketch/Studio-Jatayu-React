const express = require('express');
const router = express.Router();
const { protect, requireApiKey, authorizeRoles } = require('../middleware/authMiddleware');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', requireApiKey, protect, authorizeRoles('admin','superadmin'), getAllUsers);
router.get('/:id', requireApiKey, protect, getUser);
router.put('/:id', requireApiKey, protect, updateUser);
router.delete('/:id', requireApiKey, protect, deleteUser);

module.exports = router;
