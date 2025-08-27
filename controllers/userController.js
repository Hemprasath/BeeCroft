// controllers/userController.js
const User = require('../models/users'); // Adjust path as needed

// Create user
exports.createUser = async (req, res) => {
  try {
    const { username, phone, email, role ,password } = req.body;

    if (!username || !phone || !email || !role || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({
      $or: [{ phone }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with same email or phone already exists." });
    }

    const user = new User({ username, phone, email, role ,password,createdBy: req.user.username});
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'User creation failed', error: err.message });
  }
};



// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, phone, email, role } = req.body;

    if (!username || !phone || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicateUser = await User.findOne({
      _id: { $ne: userId },
      $or: [{ phone }, { email }]
    });

    if (duplicateUser) {
      return res.status(400).json({
        message: 'Another user with the same phone or email already exists.'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, phone, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
