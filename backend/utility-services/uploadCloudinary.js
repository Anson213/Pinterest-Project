import cloudinary from '../configurations/cloudinary.js';
import Pin from '../data-models/pinSchema.js';
const upload = require('../configurations/multer');


const createPin = async (file, pinData) => {
  if (!file) throw new Error('No file uploaded');

  // Convert buffer to base64 for Cloudinary
  const uploadStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  // Upload directly from buffer
  const result = await cloudinary.uploader.upload(uploadStr, {
    folder: 'pins',
    use_filename: true,
    unique_filename: false,
  });

  // Save to database
  const newPin = new Pin({
    title: pinData.title,
    description: pinData.description,
    imageUrl: result.secure_url,
    userId: pinData.userId,
  });

  return await newPin.save();
};

module.exports = { createPin };