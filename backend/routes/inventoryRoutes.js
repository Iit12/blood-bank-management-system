const express = require('express');
const { getInventory, addBloodUnit } = require('../controllers/inventoryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getInventory);
router.post('/', protect, addBloodUnit);

module.exports = router;