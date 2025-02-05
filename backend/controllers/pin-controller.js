const Pin = require('../data-models/pinSchema');

//You may need to add helper functions like you did with bcrypt for auth;

const { createPin } = require('../utility-services/uploadCloudinary');

const uploadData = async (req, res) => {
    try {
        const pin = await createPin(req.file, req.body); //This function merely sends data to uploadCloudinary.js
        res.status(201).json({ success: true, data: pin });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
}

const retrieveData = async (req, res) => {

}

const deleteData = async (req, res) => {

}

module.exports = { uploadData, retrieveData, deleteData };