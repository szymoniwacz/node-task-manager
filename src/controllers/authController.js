const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '1h'
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
