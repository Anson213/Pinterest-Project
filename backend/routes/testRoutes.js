const express = require('express');
const upload = require('../configurations/multer.js');
const multerMiddleware = upload.single('file');
const { dbConnectionTest, dbTests, cloudinaryConnectTest, cloudinaryTests} = require('../controllers/test-controllers.js');

const router = express.Router();

router.get('/db-connection-test', dbConnectionTest)
router.post('/db-read-write-tests', dbTests)
router.get('/cloudinary-connection-test', cloudinaryConnectTest)
router.post('/cloudinary-write-test',multerMiddleware, cloudinaryTests)


module.exports = router;