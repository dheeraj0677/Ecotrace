import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { limiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.routes.js';
import footprintRoutes from './routes/footprint.routes.js';
import actionsRoutes from './routes/actions.routes.js';
import leaderboardRoutes from './routes/leaderboard.routes.js';
import userRoutes from './routes/user.routes.js';
import { startCronJobs } from './services/cronService.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/footprint', footprintRoutes);
app.use('/api/v1/actions', actionsRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use('/api/v1/user', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// Start server
const start = async () => {
  try {
    await connectDB();
    startCronJobs();
    app.listen(PORT, () => {
      console.log(`🌿 EcoTrace server running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    // Start without DB for development
    app.listen(PORT, () => {
      console.log(`🌿 EcoTrace server running on port ${PORT} (without database)`);
    });
  }
};

start();
