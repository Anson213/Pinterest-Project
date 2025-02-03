const exprees = require('express');
const { uploadData } = require('../controllers/create-controller');

const router = express.Router();

router.post('/create', uploadData)

module.exports = router;