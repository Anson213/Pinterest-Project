const mongoose = require('mongoose');   


const engagementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    pinId: {
        type: String,
        required: true,
    },
    like: [{
        type: Array,
        required: true,
    }],
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('Engagement', engagementSchema);