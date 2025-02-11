const Board = require('../models/board-model');
const User = require('../models/user-model');
const Pin = require('../models/pin-model');

const createBoard = async (req, res) => {
    const { name, description } = req.body.board;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newBoard = new Board({ name, description, userId });
        const savedBoard = await newBoard.save();

        res.status(201).json({ success: true, board: savedBoard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const retrieveBoard = async (req, res) => {
    try {
        const boardId = req.params.boardId || req.body.boardId;
        const board = await Board.findById(boardId).populate('pins');

        if (!board) return res.status(404).json({ message: 'Board not found' });

        res.status(200).json({ success: true, pins: board.pins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteBoard = async (req, res) => {
    try {
        const boardId = req.params.boardId || req.body.boardId;
        const board = await Board.findByIdAndDelete(boardId);

        if (!board) return res.status(404).json({ message: 'Board not found' });

        await Pin.deleteMany({ _id: { $in: board.pins } });

        res.status(200).json({ success: true, message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const addPin = async (req, res) => {
    try {
        const { boardId, pinId } = req.body;
        if (!boardId || !pinId) return res.status(400).json({ message: 'Board ID and Pin ID are required' });

        const board = await Board.findByIdAndUpdate(
            boardId,
            { $addToSet: { pins: pinId } }, // Prevents duplicates
            { new: true }
        );

        if (!board) return res.status(404).json({ message: 'Board not found' });

        res.status(201).json({ success: true, message: 'Pin added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const removePin = async (req, res) => {
    try {
        const { boardId, pinId } = req.body;
        if (!boardId || !pinId) return res.status(400).json({ message: 'Board ID and Pin ID are required' });

        const board = await Board.findByIdAndUpdate(boardId, { $pull: { pins: pinId } }, { new: true });

        if (!board) return res.status(404).json({ message: 'Board not found' });

        res.status(200).json({ success: true, message: 'Pin removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const loadPin = async (req, res) => {
    try {
        const { pinId } = req.params;
        const pin = await Pin.findById(pinId);

        if (!pin) return res.status(404).json({ message: 'Pin not found' });

        res.status(200).json({ success: true, pin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = { createBoard, retrieveBoard, deleteBoard, addPin, removePin, loadPin };