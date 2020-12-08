const express = require('express');
const router = express.Router();
const officeController = require('../controllers/officeController');

router.get('/', officeController.get_office);
router.post('/', officeController.add_office_to_session);

module.exports = router;