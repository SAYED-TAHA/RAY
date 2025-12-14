import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  barcode: String,
  sku: String,
  category: String,
  image: String,
  stock: {
    type: Number,
    default: 0,
  },
  minStock: {
    type: Number,
    default: 10,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  dailySales: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
