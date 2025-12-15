import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './src/api/router/router.js';
import errorHandler from './src/api/middlewares/errorHandler.js';
import AppError from './src/api/utils/AppError.js';

const app = express();

// 🔐 Security & parsing
app.use(cors());
app.use(helmet());
app.use(express.json());

// ❤️ Health check
app.get('/healthCheck', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 🚏 Routes
app.use('/api', router);

// 💥 Global Error Handler (LAST)
app.use(errorHandler);

export default app;
