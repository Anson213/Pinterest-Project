import cloudinary from '../configurations/cloudinary.js';
import Pin from '../data-models/pinSchema.js';


const createPin = async (file, pinData, userId) => {
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
    imageId: result.public_id,
    userId: userId,
  });

    return await newPin.save();
};

 // retrieve pin is not needed as the Cloudinary CDN makes it easy to retrieve images

const deletePin = async (id) => {
   try {
 
     const pin = Pin.findById(id);
     const assetId = pin.imageId;

     const cloudinaryResponse = await cloudinary.uploader.destroy(assetId);
     const deletedPin = await Pin.findByIdAndDelete(id);

     res.status(200).json({ success: true, message: 'Pin deleted successfully' });     

   } catch (error) {
     throw new Error('Error deleting pin');
   }
}


module.exports = { createPin, deletePin };