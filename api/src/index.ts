import express from 'express';
import cors from 'cors';
import productsRouter from './products.router';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productsRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: 'MongoDB' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});