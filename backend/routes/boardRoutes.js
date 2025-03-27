const express = require('express');
const {createBoard, retrieveBoards, deleteBoard, loadPin, addPin, removePin} = require('../controllers/board-controller');

const router = express.Router();

router.post('/create', createBoard);
router.get('/retrieve/:userId', retrieveBoards);
router.delete('/delete/:boardId', deleteBoard);
router.post('/add/:pinId', addPin);
router.delete('/remove/:boardId', removePin);
router.get('/load', loadPin);

module.exports = router;