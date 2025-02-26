const mongoose = require('mongoose');
const cloudinary = require('../configurations/cloudinary.js'); 
const Test = require('../data-models/testSchema.js');
const streamifier = require('streamifier')

const dbConnectionTest = (req, res) => {
   try {
    if(mongoose.connection.readyState === 1) {
        return res.status(200).json({success: true, message: 'MongoDB is connected'})
    } else {
        return res.status(500).json({success: false, message: 'MongoDB connection failed'})
    } 
   } catch (error) {
        return res.status(500).json({success:false, message: 'Error check DB connection credentials', error: error.message})
   }
};

const dbTests = async (req, res) => {
    try {
        const test = new Test({ message: 'MongoDB Entry Test'});
        const saved = await test.save();
        if (!saved) throw new Error('Write test failed');

        const retrieved = await Test.findById(saved._id);
        if (!retrieved) throw new Error('Read test failed');

        await Test.findByIdAndDelete(saved._id);

        const check = await Test.findById(saved._id);
        if (check) throw new Error('Delete test failed');

        res.status(200).json({ success: true, message: 'MongoDB CRUD tests passed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
 };

const cloudinaryConnectTest = async (req, res) => {
    try {
        if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret)
             throw new Error('Cloudinary is not properly configured');        

        const result = await cloudinary.api.ping();
        res.status(200).json({ success: true, message: "Cloudinary is connected", results: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Cloudinary connection failed", error: error.message });
    }
};

/*async function uploadToCloudinary(filePath) {
    try {
        return await cloudinary.uploader.upload(filePath);
    } catch (error) {
        throw new Error(`Cloudinary upload test failed: ${error.message}`);
    }
}*/

async function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) return reject(new Error(`Cloudinary upload failed: ${error.message}`));
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
}

async function deleteFromCloudinary(publicId) {
    try {
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error(`Cloudinary deletion test failed: ${error.message}`);
    }
}

const cloudinaryTests = async (req, res) => {
    try {
        if (!req.file) throw new Error('No file uploaded');
        //if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
                                                        //replaced path with buffer as I use memoryStorage.
        const uploadedImage = await uploadToCloudinary(req.file.buffer);
        if (!uploadedImage || !uploadedImage.url) throw new Error('Upload test failed');

        const retrievedImage = await cloudinary.api.resource(uploadedImage.public_id);
        if (!retrievedImage || !retrievedImage.url) throw new Error('Read test failed');

        await deleteFromCloudinary(uploadedImage.public_id);

        try {
            await deleteFromCloudinary(uploadedImage.public_id);
            throw new Error('Delete verification failed');
        } catch (err) {
            if (err.message.includes('not found')) throw err;
        }

        res.status(200).json({ success: true, message: 'Cloudinary tests passed' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Cloudinary test failed at step: ${error.message}`, error :error.message });
        return
    }
};

module.exports = {
    dbConnectionTest,
    dbTests,
    cloudinaryConnectTest,
    cloudinaryTests
};