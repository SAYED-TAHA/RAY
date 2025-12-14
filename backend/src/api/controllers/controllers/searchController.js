import Product from '../../../models/Product.js';

// Advanced search with keywords and filters
export const searchProducts = async (req, res) => {
  try {
    const startTime = Date.now();
    
    const {
      q: query,
      category,
      status,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Build search filter
    const filter = {};
    
    // Text search with keywords
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { sku: { $regex: query, $options: 'i' } },
        { barcode: { $regex: query, $options: 'i' } },
        { keywords: { $in: [new RegExp(query, 'i')] } }
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Stock range filter
    if (minStock || maxStock) {
      filter.stock = {};
      if (minStock) filter.stock.$gte = parseInt(minStock);
      if (maxStock) filter.stock.$lte = parseInt(maxStock);
    }

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * Math.min(parseInt(limit), 100);

    // Execute search
    const [products, total] = await Promise.all([
      Product.find(filter)
        .select('-__v')
        .sort(sort)
        .skip(skip)
        .limit(Math.min(parseInt(limit), 100)),
      Product.countDocuments(filter)
    ]);

    const searchTime = Date.now() - startTime;

    // Generate suggestions based on search
    const suggestions = await generateSuggestions(query, category);

    res.status(200).json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / Math.min(parseInt(limit), 100)),
        total,
        limit: Math.min(parseInt(limit), 100)
      },
      suggestions,
      analytics: {
        searchTime,
        totalResults: total,
        filters: Object.keys(filter).filter(key => {
          const value = filter[key];
          return value !== undefined && value !== null && 
                 (typeof value !== 'object' || Object.keys(value).length > 0);
        })
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Generate search suggestions
export const getSuggestions = async (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || query.length < 2) {
      return res.json([]);
    }

    // Get product names that match the query
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).select('name category').limit(10);

    // Extract unique suggestions
    const suggestions = new Set();
    
    products.forEach(product => {
      const words = product.name.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.includes(query.toLowerCase()) && word.length > 2) {
          suggestions.add(word);
        }
      });
      
      if (product.category && product.category.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.category);
      }
    });

    // Add popular keywords that match
    const popularKeywords = await getPopularKeywordsFromDB(query);
    popularKeywords.forEach(keyword => suggestions.add(keyword.keyword));

    const result = Array.from(suggestions)
      .slice(0, 8)
      .map(suggestion => ({
        keyword: suggestion,
        count: products.filter(p => 
          p.name.toLowerCase().includes(suggestion) || 
          p.category?.toLowerCase().includes(suggestion)
        ).length
      }));

    res.json(result);
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get popular keywords
export const getPopularKeywords = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const keywords = await getPopularKeywordsFromDB(null, parseInt(limit));
    res.json(keywords);
  } catch (error) {
    console.error('Popular keywords error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Helper functions
async function generateSuggestions(query, category) {
  const suggestions = [];
  
  if (query && query.length > 2) {
    // Get related categories
    const categories = await Product.distinct('category', {
      name: { $regex: query, $options: 'i' }
    });
    suggestions.push(...categories.slice(0, 3));
  }
  
  return suggestions;
}

async function getPopularKeywordsFromDB(query, limit = 10) {
  try {
    // This would typically come from a search analytics collection
    // For now, we'll extract from product names
    const products = await Product.find().select('name category').limit(100);
    const keywordCounts = new Map();
    
    products.forEach(product => {
      const words = product.name.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3 && !query || word.includes(query?.toLowerCase())) {
          keywordCounts.set(word, (keywordCounts.get(word) || 0) + 1);
        }
      });
      
      if (product.category) {
        keywordCounts.set(product.category.toLowerCase(), (keywordCounts.get(product.category.toLowerCase()) || 0) + 1);
      }
    });
    
    return Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([keyword, count]) => ({ keyword, count }));
  } catch (error) {
    console.error('Error getting popular keywords:', error);
    return [];
  }
}
