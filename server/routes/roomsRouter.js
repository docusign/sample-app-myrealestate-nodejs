const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

router.get('/', roomsController.get_rooms);
router.post('/', roomsController.create_room);
router.patch('/:roomId', roomsController.edit_room);

router.get('/fieldData/:roomId', roomsController.get_field_data);

module.exports = router;