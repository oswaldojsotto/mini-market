import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IProduct>('Product', ProductSchema);