const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
     title: { 
       type: String,
       required: true,
    },
     description: { 
       type: String,
       required: true,
    },
     imageUrl: {
       type: String,
       required: true,
    },
     imageId: {
       type: String,           // This is the public_id from Cloudinary of the asset 
       required: true,
    },
      userId: {
       type: String,
       required: true,
    },
       boardId: [{ 
       type: Array, 
       required: true,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Pin', pinSchema);