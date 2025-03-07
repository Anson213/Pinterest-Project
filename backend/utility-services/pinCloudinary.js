const cloudinary = require('../configurations/cloudinary'); 
const Pin = require('../data-models/pinSchema');

const createPin = async (file, pinData, userId) => {
  if (!file) throw new Error('No file uploaded');

   try {
  // Convert buffer to base64 for Cloudinary
  const uploadStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  // Upload directly from buffer
  const result = await cloudinary.uploader.upload(uploadStr, {
    folder: 'pins',
    use_filename: true,
    unique_filename: true,
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
  } catch (error){
    throw new Error(`Error creating pin: ${error.message}`);
  }
};

 // retrieve pin is not needed as the Cloudinary CDN makes it easy to retrieve images

const deletePin = async (id) => {
   try {
       const pin = Pin.findById(id);
       if (!pin) throw new Error('Pin not found');

      const cloudinaryResponse = await cloudinary.uploader.destroy(pin.imageId);
      const deletedPin = await Pin.findByIdAndDelete(id);
     
       if(cloudinaryResponse && deletedPin) {
         return res.status(200).json({ success: true, message: 'Pin deleted successfully' });  ;
       } else {
         return res.status(500).json({ success: false, message: 'Server error, Pin not Deleted' });
       }

     } catch (error) {
       throw new Error('Error deleting pin');
    }
}


module.exports = { createPin, deletePin };