const express = require('express');
const { getAllRequests, createRequest } = require('../controllers/requestController');  // ← No 's' at the end
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllRequests);
router.post('/', protect, createRequest);

module.exports = router;
