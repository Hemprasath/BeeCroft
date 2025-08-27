const express = require('express');
const { login, me, logout,updatePassword } = require('../controllers/adminController');

const router = express.Router();

router.post('/login', login);
router.get('/me', me);
router.post('/logout', logout);
router.post('/api/update-password',updatePassword)


module.exports = router;
