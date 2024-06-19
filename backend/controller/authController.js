const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      const user = await User.create({ username, email, password });
  
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, error: 'Пользователь с данным email уже существует' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, error: 'Неверный email или пароль' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};