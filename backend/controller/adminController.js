// const Admin = require('../models/Admin');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRETA, {
//     expiresIn: '2d',
//   });
// };

// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const admin = await Admin.create({ username, email, password });

//     res.status(201).json({
//       success: true,
//       token: generateToken(admin._id),
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (admin && (await admin.matchPassword(password))) {
//       res.json({
//         success: true,
//         token: generateToken(admin._id),
//       });
//     } else {
//       res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// exports.getMe = async (req, res) => {
//   const admin = await Admin.findById(req.admin.id);

//   res.status(200).json({
//     success: true,
//     data: admin,
//   });
// };

// exports.getAllUsers = async (req, res) => {
//   const users = await User.find({});

//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// };