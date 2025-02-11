const express = require('express');
const {createBoard, retrieveBoard, deleteBoard, loadPin, addPin, removePin} = require('../controllers/board-controller');

const router = express.Router();

router.post('/create', createBoard);
router.get('/retrieve', retrieveBoard);
router.delete('/delete', deleteBoard);
router.get('/load', loadPin);
router.post('/add', addPin);
router.delete('/remove', removePin);

module.exports = router;