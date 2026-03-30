const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const auth = require('../middlewares/auth');

router.get('/', settingsController.getSettings);    
router.put('/:id',auth, settingsController.updateSetting); 
module.exports = router;