const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/me', authenticate, userController.getMe);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
