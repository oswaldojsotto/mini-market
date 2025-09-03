import { config } from 'dotenv';
import path from 'path';
const envPath = path.join(__dirname, '../../.env');
config({ path: envPath });

import { connectDB } from '../config/database';
import Product from '../models/Product';
import fs from 'fs';

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seed...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const jsonPath = path.join(__dirname, '../data/products.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const productsData = JSON.parse(jsonData);
    
    await connectDB();
    
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    
    console.log(`✅ Successfully seeded ${productsData.length} products!`);
    process.exit(0);
    
  } catch (error: unknown) {
    console.error('❌ Seeding failed:');
    
    if (error instanceof Error) {
      console.error(error.message);
      
      if (error.message.includes('MONGODB_URI')) {
        console.error('Please check your .env file');
      }
    }
    
    process.exit(1);
  }
};

seedDatabase();