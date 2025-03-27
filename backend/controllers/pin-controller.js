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
      const { title, description} = req.body;

      if (!req.file) return res.status(400).json({ message: 'File required' });
      if (!req.body) return res.status(400).json({ message: 'data required' });

        const pin = await createPin(req.file, title, description, userId); //This function merely sends data to pinCloudinary.js
        res.status(201).json({ success: true, data: pin });

      } catch (error) {
        console.error("Upload Data Error:", error);
        res.status(400).json({ success: false});
      }
}

const editData = async (req, res) => {
  try {

    const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
      }
    
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;  

    // Only allow metadata updates
    const { title, description} = req.body;
    const  pin  = req.params.pinId;
    if(!pin) return res.status(400).json({message: "where is pin ??"})
      if (!title && !description) {
        return res.status(400).json({ message: 'No update fields provided' });
      }
  
    //const pinId = req.pin; // Get Pin ID from URL parameters

    const existingPin = await Pin.findById(pin);
    if (!existingPin) return res.status(404).json({ success: false, message: 'Pin not found' });

    // Ensure the user owns the Pin
    if (existingPin.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Pin' });
    }

    const updatedPin = await Pin.findByIdAndUpdate(
      pin,
      { title, description},
      { new: true } // Return the updated document
    );
     
       if(updatedPin) {
        res.status(200).json({ success: true, data: updatedPin });
       } else {
        res.status(400).json({ success: false, message: "Pin Update failed" });
       }
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

const retrieveData = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
      }
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      
    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;
    const pin = req.params.pinId;
    if (!pin) {
      return res.status(400).json({ success: false, message: 'Pin ID is required' });
    }


    const pinDoc = await Pin.findById(pin);
    if (!pinDoc) return res.status(404).json({ success: false, message: 'Pin not found' });

    if (pinDoc.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Pin' });
    }

    res.status(200).json({ success: true, data: pinDoc });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


const deleteData = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;
    const pinId = req.params.pinId;

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
       res.status(500).json({message: 'Failed to delete Pin. Database or Cloudinary issue.', success: false})
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }

}

module.exports = { uploadData, editData, retrieveData, deleteData };