const express = require('express');
const router = express.Router();
const { getStats, getReport } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('Admin'));

router.get('/stats', getStats);
router.get('/report', getReport);

module.exports = router;
