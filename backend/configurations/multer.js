const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedExtentions = /\.(jpeg|jpg|png|mp4|avi)$/i;
    const allowedMimes = ['image/jpeg', 'image/png', 'video/mp4', 'video/avi', 'video/x-msvideo'];

    const isValidExt = allowedExtentions.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedMimes.includes(file.mimetype);
    
    if (isValidExt && isValidMime) {
      return cb(null, true); // Accept the file
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type'));// Reject the file
    }
  };

  const upload = multer({
    storage: storage,  // Choose disk or memory storage
    limits: { fileSize: 50 * 1024 * 1024 },  // Limit file size to 50MB
    fileFilter: fileFilter  // Filter only specific file types
  });

  module.exports = upload;  // Export the middleware
  