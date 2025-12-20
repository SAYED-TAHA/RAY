
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Import after loading environment variables
import connectDB from './config/mongodb.js';
import passport from './config/passport.js';
import { logger, errorHandler } from './utils/logger.js';
import productRoutes from './api/routes/products.js';
import searchRoutes from './api/routes/search.js';
import storefrontRoutes from './api/routes/storefront.js';
import offersRoutes from './api/routes/offers.js';
import adminRoutes from './api/routes/admin.js';
import profileRoutes from './api/routes/profile.js';
import jobsRoutes from './api/routes/jobs.js';
import merchantsRoutes from './api/routes/merchants.js';
import ordersRoutes from './api/routes/orders.js';
import analyticsRoutes from './api/routes/analytics.js';
import usersRoutes from './api/routes/users.js';
import systemRoutes from './api/routes/system.js';
import auditRoutes from './api/routes/audit.js';
import cartRoutes from './api/routes/cart.js';
import authRoutes from './api/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ];
    
    // Add CORS_ORIGIN from environment if set
    if (process.env.CORS_ORIGIN) {
      allowedOrigins.push(process.env.CORS_ORIGIN);
    }
    
    // In production, be more strict
    if (process.env.NODE_ENV === 'production') {
      // Don't allow requests with no origin in production
      if (!origin) {
        return callback(new Error('Not allowed by CORS'));
      }
      
      // Don't allow all 127.0.0.1 subdomains in production
      if (origin.includes('127.0.0.1') && !allowedOrigins.includes(origin)) {
        return callback(new Error('Not allowed by CORS'));
      }
    }
    
    // Allow requests with no origin in development (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (origin && origin.includes('127.0.0.1') && process.env.NODE_ENV !== 'production') {
      // Allow all 127.0.0.1 origins in development (browser preview proxy)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../uploads')));

// Initialize Passport
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/storefront', storefrontRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/merchants', merchantsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/cart', cartRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('RAY API Server is running...');
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  console.log(` Server running on http://localhost:${PORT}`);
});
