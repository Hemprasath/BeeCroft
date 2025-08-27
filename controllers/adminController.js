const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const User= require('../models/users')

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await Admin.findOne({ username });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: '1d'
//     });

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None',
//       domain: '.messagly.com',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// };


exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const inputUsername = username.trim();
  const inputPassword = password.trim();

  try {
    // Case-insensitive username search
    const user = await User.findOne({ username: { $regex: `^${inputUsername}$`, $options: 'i' } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const passwordMatch = user.comparePassword 
      ? await user.comparePassword(inputPassword) // hashed password case
      : user.password.trim() === inputPassword;  // plain-text password case

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // First-time login flow
    if (user.firstLogin) {
      return res.status(200).json({
        firstLogin: true,
        message: 'First login - update your password',
        userId: user._id
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1d'
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      // sameSite: 'None',
      // domain: '.messagly.com',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword) {
      return res.status(400).json({ message: 'User ID and new password are required' });
    }

    // Update password and mark firstLogin false
    await User.findByIdAndUpdate(userId, {
      password: newPassword, // consider hashing if not using plain text
      firstLogin: false
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password update failed', error: err.message });
  }
};

exports.me = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ username: decoded.username });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};


