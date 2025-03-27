const cloudinary = require('../configurations/cloudinary'); 
const Pin = require('../data-models/pinSchema');

const createPin = async (file, title, description, userId) => {
  if (!file) throw new Error('No file uploaded');

  try {
      // Upload the image using a Promise wrapper
      const uploadToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'pins', resource_type: 'image', unique_filename: true },
                (error, result) => {
                    if (error) return reject(new Error('Cloudinary upload failed'));
                    resolve(result);
                }
            );
            stream.end(fileBuffer);
        });
    };

    // Await the Cloudinary upload
    const result = await uploadToCloudinary(file.buffer);

    // Save to database
    const newPin = new Pin({
        title: title,
        description: description,
        imageUrl: result.secure_url,
        imageId: result.public_id,
        userId,
    });

    return await newPin.save();
} catch (error) {
    throw new Error(`Error creating pin: ${error.message} from cloudinary`);
}
};

 // retrieve pin is not needed as the Cloudinary CDN makes it easy to retrieve images

const deletePin = async (id) => {
   try {
       const pin = await Pin.findById(id);
       if (!pin) throw new Error('Pin not found');

      const cloudinaryResponse = await cloudinary.uploader.destroy(pin.imageId);
      const deletedPin = await Pin.findByIdAndDelete(id);
     
       if(cloudinaryResponse && deletedPin) {
         return true
       } else {
         return false
       }

     } catch (error) {
       throw new Error(`Error deleting pin: ${error.message}`);
    }
}


module.exports = { createPin, deletePin };