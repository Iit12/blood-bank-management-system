const express = require('express');
const { getAllDonors, createDonor } = require('../controllers/donorController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllDonors);
router.post('/', protect, createDonor);

module.exports = router;