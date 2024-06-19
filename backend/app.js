const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const workspaceRouter = require('./routes/workspace');

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));

// Маршруты
app.use('/api/auth', authRouter);
// app.use('/api/admin', adminRouter);
app.use('/api/workspaces', workspaceRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});