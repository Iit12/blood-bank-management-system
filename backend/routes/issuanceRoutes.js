const express = require('express');
const { issueBlood } = require('../controllers/issuanceController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.post('/', protect, issueBlood);

module.exports = router;