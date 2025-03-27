const express = require('express');
const upload = require('../configurations/multer');
const multerMiddleware = upload.single('file');
const { uploadData, retrieveData, deleteData, editData } = require('../controllers/pin-controller');

const router = express.Router();

router.post('/upload', multerMiddleware, uploadData);
router.post('/edit/:pinId', editData)
router.get('/retrieve/:pinId', retrieveData);
router.delete('/delete/:pinId', deleteData);

module.exports = router;