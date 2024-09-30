const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/login/callback', (req, res) => res.send("hi"));
module.exports = router;