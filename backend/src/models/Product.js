import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // Add index for better search performance
  },
  price: {
    type: Number,
    required: true,
    index: true, // Add index for price filtering
  },
  barcode: String,
  sku: {
    type: String,
    index: true, // Add index for SKU search
  },
  category: {
    type: String,
    index: true, // Add index for category filtering
  },
  image: String,
  description: String,
  keywords: [{
    type: String,
    index: true, // Add index for keyword search
  }],
  tags: [String], // Additional tags for categorization
  searchRank: {
    type: Number,
    default: 0, // SEO ranking score
  },
  stock: {
    type: Number,
    default: 0,
    index: true, // Add index for stock filtering
  },
  minStock: {
    type: Number,
    default: 10,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    index: true, // Add index for status filtering
  },
  dailySales: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0, // Track views for popularity
  },
  searchCount: {
    type: Number,
    default: 0, // Track search appearances
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Add index for sorting
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound indexes for better search performance
productSchema.index({ name: 'text', category: 'text', keywords: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ price: 1, stock: 1 });

// Pre-save middleware to generate keywords
productSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isModified('category') || this.isModified('description')) {
    this.keywords = this.generateKeywords();
  }
  this.updatedAt = new Date();
  next();
});

// Method to generate keywords from product data
productSchema.methods.generateKeywords = function() {
  const keywords = new Set();
  
  // Extract words from name
  if (this.name) {
    const nameWords = this.name.toLowerCase().split(/\s+/);
    nameWords.forEach(word => {
      if (word.length > 2) keywords.add(word);
    });
  }
  
  // Add category
  if (this.category) {
    keywords.add(this.category.toLowerCase());
  }
  
  // Extract words from description
  if (this.description) {
    const descWords = this.description.toLowerCase().split(/\s+/);
    descWords.forEach(word => {
      if (word.length > 3) keywords.add(word);
    });
  }
  
  // Add price-related keywords
  if (this.price < 100) {
    keywords.add('رخيص');
    keywords.add('منخفض السعر');
  } else if (this.price > 1000) {
    keywords.add('فاخر');
    keywords.add('غالي');
  }
  
  // Add stock-related keywords
  if (this.stock === 0) {
    keywords.add('نفد');
    keywords.add('غير متوفر');
  } else if (this.stock > 50) {
    keywords.add('متوفر');
    keywords.add('مخزون كافي');
  }
  
  return Array.from(keywords);
};

// Method to update search rank
productSchema.methods.updateSearchRank = function() {
  // Calculate rank based on views, sales, and recency
  const daysSinceCreation = (Date.now() - this.createdAt) / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 100 - daysSinceCreation);
  const viewScore = Math.min(this.viewCount * 0.1, 50);
  const salesScore = this.dailySales * 2;
  
  this.searchRank = recencyScore + viewScore + salesScore;
  return this.save();
};

export default mongoose.model('Product', productSchema);
