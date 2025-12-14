
import Product from '../../../models/Product.js';
import { validateObjectId } from '../../../middleware/validation.js';

// Security: Add audit logging
const logActivity = (action, userId, productId = null, details = {}) => {
  console.log(`[AUDIT] ${action} by user ${userId} for product ${productId || 'N/A'}:`, details);
};

export const getProducts = async (req, res) => {
  try {
    // Performance: Add pagination and filtering
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100 items
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.minStock !== undefined) filter.stock = { $gte: parseInt(req.query.minStock) };
    
    const products = await Product.find(filter)
      .select('-__v') // Exclude version field
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments(filter);
    
    logActivity('FETCH_PRODUCTS', req.user?.id || 'anonymous', null, { 
      page, limit, filter, total 
    });
    
    res.status(200).json({
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Security: Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const product = await Product.findById(id).select('-__v');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    logActivity('FETCH_PRODUCT', req.user?.id || 'anonymous', id);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Security: Input validation is handled by middleware
    const { name, price, barcode, sku, category, stock, minStock, status, dailySales } = req.body;
    
    // Security: Check for duplicate SKU/barcode
    if (sku) {
      const existingSku = await Product.findOne({ sku });
      if (existingSku) {
        return res.status(409).json({ message: 'Product with this SKU already exists' });
      }
    }
    
    if (barcode) {
      const existingBarcode = await Product.findOne({ barcode });
      if (existingBarcode) {
        return res.status(409).json({ message: 'Product with this barcode already exists' });
      }
    }
    
    const product = new Product({
      name,
      price,
      barcode: barcode || undefined,
      sku: sku || undefined,
      category: category || undefined,
      stock: stock || 0,
      minStock: minStock || 10,
      status: status || 'active',
      dailySales: dailySales || 0
    });
    
    await product.save();
    
    logActivity('CREATE_PRODUCT', req.user?.id || 'anonymous', product._id, { 
      name: product.name, price: product.price 
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Security: Handle specific error cases
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', details: error.message });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Security: Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    // Security: Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Security: Check for duplicate SKU/barcode (excluding current product)
    const { sku, barcode } = req.body;
    if (sku && sku !== existingProduct.sku) {
      const existingSku = await Product.findOne({ sku, _id: { $ne: id } });
      if (existingSku) {
        return res.status(409).json({ message: 'Product with this SKU already exists' });
      }
    }
    
    if (barcode && barcode !== existingProduct.barcode) {
      const existingBarcode = await Product.findOne({ barcode, _id: { $ne: id } });
      if (existingBarcode) {
        return res.status(409).json({ message: 'Product with this barcode already exists' });
      }
    }
    
    const product = await Product.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    ).select('-__v');
    
    logActivity('UPDATE_PRODUCT', req.user?.id || 'anonymous', id, { 
      changes: Object.keys(req.body) 
    });
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', details: error.message });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Security: Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    // Security: Check if product exists before deletion
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Security: Check if product can be deleted (e.g., no active orders)
    // This would be implemented based on business logic
    
    await Product.findByIdAndDelete(id);
    
    logActivity('DELETE_PRODUCT', req.user?.id || 'anonymous', id, { 
      name: product.name 
    });
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
