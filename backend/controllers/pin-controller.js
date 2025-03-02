const {decodeAccessToken} = require('../utility-services/jsonTokens');
const Pin = require('../data-models/pinSchema');

//You may need to add helper functions like you did with bcrypt for auth;
const { createPin , deletePin} = require('../utility-services/pinCloudinary');

const uploadData = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
      }
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      const decodedToken = decodeAccessToken(token);
      const  userId = decodedToken.id;

      if (!req.file || !req.body) return res.status(400).json({ message: 'File and data required' });

        const pin = await createPin(req.file, req.body, userId); //This function merely sends data to pinCloudinary.js
        res.status(201).json({ success: true, data: pin });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
}

const editData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;
    const pinId = req.params.id; // Get Pin ID from URL parameters

    const existingPin = await Pin.findById(pinId);
    if (!existingPin) return res.status(404).json({ success: false, message: 'Pin not found' });

    // Ensure the user owns the Pin
    if (existingPin.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Pin' });
    }

    // Only allow metadata updates
    const { title, description, board, link } = req.body;
    const updatedPin = await Pin.findByIdAndUpdate(
      pinId,
      { title, description, board, link },
      { new: true } // Return the updated document
    );

    res.status(200).json({ success: true, data: updatedPin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

const retrieveData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;
    const pinId = req.params.id;

    const pin = await Pin.findById(pinId);
    if (!pin) return res.status(404).json({ success: false, message: 'Pin not found' });

    if (pin.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Pin' });
    }

    res.status(200).json({ success: true, data: pin });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


const deleteData = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;
    const pinId = req.params.id;

    if (!pinId) return res.status(400).json({ success: false, message: 'Pin ID required' });

    const existingPin = await Pin.findById(pinId);
    if (!existingPin) return res.status(404).json({ success: false, message: 'Pin not found' });

    if (existingPin.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Pin' });
    }

    const deleteImage  = await deletePin(pinId);  //deletes the Pin from MongoDB and the assets from Cloudinary
    if(deleteImage){
       res.status(200).json({ success: true, message: 'Pin deleted successfully' });
    } else {
       res.status(500).json({message: 'Something didnt workout', success: false})
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }

}

module.exports = { uploadData, editData, retrieveData, deleteData };