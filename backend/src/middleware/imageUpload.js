import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Configure Multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter
});

// Image optimization middleware
const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const { buffer, originalname, mimetype } = req.file;
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const outputPath = path.join('uploads', 'images', filename);

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Optimize and convert to WebP
    await sharp(buffer)
      .resize(800, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 80,
        effort: 4
      })
      .toFile(outputPath);

    // Update file info
    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';
    req.file.size = fs.statSync(outputPath).size;

    next();
  } catch (error) {
    console.error('Image optimization error:', error);
    next(error);
  }
};

// Multiple images upload
const uploadMultiple = upload.array('images', 5);

const optimizeMultiple = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const optimizedFiles = [];

    for (const file of req.files) {
      const { buffer, originalname } = file;
      const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
      const outputPath = path.join('uploads', 'images', filename);

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Optimize and convert to WebP
      await sharp(buffer)
        .resize(800, 800, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ 
          quality: 80,
          effort: 4
        })
        .toFile(outputPath);

      optimizedFiles.push({
        ...file,
        filename,
        path: outputPath,
        mimetype: 'image/webp',
        size: fs.statSync(outputPath).size
      });
    }

    req.files = optimizedFiles;
    next();
  } catch (error) {
    console.error('Multiple images optimization error:', error);
    next(error);
  }
};

export { upload, optimizeImage, uploadMultiple, optimizeMultiple };
