
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
import productRoutes from './api/routes/products.js';
import storefrontRoutes from './api/routes/storefront.js';
import offersRoutes from './api/routes/offers.js';
import adminRoutes from './api/routes/admin.js';
import profileRoutes from './api/routes/profile.js';
import jobsRoutes from './api/routes/jobs.js';
import merchantsRoutes from './api/routes/merchants.js';
import ordersRoutes from './api/routes/orders.js';
import cartRoutes from './api/routes/cart.js';
import authRoutes from './api/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
app.use('/api/storefront', storefrontRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/merchants', merchantsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/cart', cartRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('RAY API Server is running...');
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
