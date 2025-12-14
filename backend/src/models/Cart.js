import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  image: String,
  subtotal: Number
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.total = this.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Cart', cartSchema);
