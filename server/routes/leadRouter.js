const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/', leadController.get_leads);
router.put('/', leadController.add_lead);
router.delete('/', leadController.delete_leads);

router.put('/random', leadController.generate_random_leads);

module.exports = router;