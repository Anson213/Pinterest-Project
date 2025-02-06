const express = require('express');
const { uploadData, retrieveData, deleteData } = require('../controllers/pin-controller');

const router = express.Router();

router.post('/upload', uploadData);
router.get('/retrieve', retrieveData);
router.delete('/delete', deleteData);

module.exports = router;