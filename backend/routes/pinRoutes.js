const exprees = require('express');
const { uploadData } = require('../controllers/pin-controller');

const router = express.Router();

router.post('/upload', uploadData);
route.get('/retrieve', retrieveData);
route.delete('/delete', deleteData);

module.exports = router;