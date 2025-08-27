const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/',authMiddleware, createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
