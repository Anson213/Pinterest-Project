const {decodeAccessToken} = require('../utility-services/jsonTokens');
const Pin = require('../data-models/pinSchema');

//You may need to add helper functions like you did with bcrypt for auth;
const { createPin , deletePin} = require('../utility-services/pinCloudinary');

const uploadData = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      const decodedToken = decodeAccessToken(token);
 
        userId = decodedToken._id;

        const pin = await createPin(req.file, req.body, userId); //This function merely sends data to uploadCloudinary.js
        res.status(201).json({ success: true, data: pin });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
}

const retrieveData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    
    const decodedToken = decodeAccessToken(token);
    const pinId = decodedToken.pin?._id;
    const pin = await Pin.findById(pinId);
  
    res.status(200).json({ success: true, data: pin });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


const deleteData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    const decodedToken = decodeAccessToken(token);
    const pinId = decodedToken.pin?._id;
    const deleteImage  = await deletePin(pinId);  //deletes the Pin from MongoDB and the assets from Cloudinary
    
    res.status(200).json({ success: true, message: 'Pin deleted successfully' });


  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }

}

module.exports = { uploadData, retrieveData, deleteData };