const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('Admin'), getUsers);

router.route('/:id')
    .delete(protect, authorize('Admin'), deleteUser);

module.exports = router;
