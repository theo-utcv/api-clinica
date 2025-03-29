const express = require('express');
const configController = require('../controllers/configController');

const router = express.Router();

router.get('/config', configController.getConfig);
router.put('/config', configController.updateConfig);

module.exports = router;