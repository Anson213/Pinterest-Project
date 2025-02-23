const cloudinary = require('../configurations/cloudinary'); 
import User from '../data-models/userSchema.js';


const createUser = async (file, userData) => {
    if (!file) throw new Error('No file uploaded');

    // Convert buffer to base64 for Cloudinary
    const uploadStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Upload directly from buffer
    const result = await cloudinary.uploader.upload(uploadStr, {
        folder: 'users',
        use_filename: true,
        unique_filename: false,
    });
} 
