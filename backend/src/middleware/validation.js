// Input validation middleware
export const validateProductInput = (req, res, next) => {
  const { name, price, stock, minStock, dailySales } = req.body;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Product name is required and must be a non-empty string' });
  }

  if (name.length > 200) {
    return res.status(400).json({ message: 'Product name must be less than 200 characters' });
  }

  // Validate price
  if (price === undefined || isNaN(price) || price < 0) {
    return res.status(400).json({ message: 'Valid price is required and must be non-negative' });
  }

  if (price > 999999999) {
    return res.status(400).json({ message: 'Price is too high' });
  }

  // Validate stock
  if (stock !== undefined && (isNaN(stock) || stock < 0 || stock > 999999)) {
    return res.status(400).json({ message: 'Stock must be a non-negative number less than 1,000,000' });
  }

  // Validate minStock
  if (minStock !== undefined && (isNaN(minStock) || minStock < 0 || minStock > 10000)) {
    return res.status(400).json({ message: 'Minimum stock must be between 0 and 10,000' });
  }

  // Validate dailySales
  if (dailySales !== undefined && (isNaN(dailySales) || dailySales < 0 || dailySales > 999999)) {
    return res.status(400).json({ message: 'Daily sales must be a non-negative number less than 1,000,000' });
  }

  // Validate optional fields
  if (req.body.category && typeof req.body.category !== 'string') {
    return res.status(400).json({ message: 'Category must be a string' });
  }

  if (req.body.sku && (typeof req.body.sku !== 'string' || req.body.sku.length > 50)) {
    return res.status(400).json({ message: 'SKU must be a string less than 50 characters' });
  }

  if (req.body.barcode && (typeof req.body.barcode !== 'string' || req.body.barcode.length > 100)) {
    return res.status(400).json({ message: 'Barcode must be a string less than 100 characters' });
  }

  // Sanitize input
  req.body.name = name.trim();
  if (req.body.category) req.body.category = req.body.category.trim();
  if (req.body.sku) req.body.sku = req.body.sku.trim();
  if (req.body.barcode) req.body.barcode = req.body.barcode.trim();

  next();
};

// MongoDB ObjectId validation
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }
  
  next();
};
