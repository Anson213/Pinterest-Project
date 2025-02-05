const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type'), false); // Reject the file
    }
  };

  const upload = multer({
    storage: storage,  // Choose disk or memory storage
    limits: { fileSize: 50 * 1024 * 1024 },  // Limit file size to 50MB
    fileFilter: fileFilter  // Filter only specific file types
  });

  module.exports = upload;  // Export the middleware
  