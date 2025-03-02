const express = require('express');
const upload = require('../configurations/multer');
const multerMiddleware = upload.single('image');
const { uploadData, retrieveData, deleteData, editData } = require('../controllers/pin-controller');

const router = express.Router();

router.post('/upload', multerMiddleware, uploadData);
router.post('/edit', editData)
router.get('/retrieve', retrieveData);
router.delete('/delete', deleteData);

module.exports = router;