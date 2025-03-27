const Board = require('../data-models/boardSchema.js');
const User = require('../data-models/userSchema.js');
const Pin = require('../data-models/pinSchema.js');
const mongoose = require('mongoose');
const {decodeAccessToken} = require('../utility-services/jsonTokens');

const createBoard = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied, token missing!' });
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        const decodedToken = decodeAccessToken(token);

        const userId = decodedToken.id;
        const { name } = req.body;

        const user = await User.findById(userId);
        if (!name) return res.status(400).json({ message: 'Board name is required' });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const newBoard = new Board({ name, userId });
        const savedBoard = await newBoard.save();

         res.status(201).json({ success: true, board: savedBoard });
    
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const retrieveBoards = async (req, res) => {
    try {
        const { userId } = req.params;

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const boards = await Board.aggregate([
            { $match: { userId: userObjectId } },
            {
                $lookup: {
                    from: 'pins',
                    let: { pinIds: '$pins'},
                    pipeline: [
                        {
                           $match: {
                              $expr: { $in: ['$_id', '$$pinIds']},
                              userId
                           }
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 3 },
                        { $project: { imageUrl: 1, _id: 0 } }
                    ],
                    as: 'previewPins'
                }
            }
        ]);
        if (!boards.length) {
            return res.status(404).json({ 
                success: false, 
                message: "No boards found for this user" 
            });
        }
        res.status(200).json({ success: true, board: boards });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const deleteBoard = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });}
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        
        const decodedToken = decodeAccessToken(token);
        const userId = decodedToken.id;
        const {boardId} = req.params.boardId || req.body.boardId;
        if (!boardId) return res.status(400).json({ message: 'Board ID is required' });

        const board = await Board.findByIdAndDelete(boardId);
        if (!board) return res.status(404).json({ message: 'Board not found' });

        if(board.userId.toString() !== userId){
            return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Board' });
        }
        res.status(200).json({ success: true, message: 'Board deleted successfully' });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server error', error: error.message })
    }};

const addPin = async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Access denied, token missing!' });
        }
        const token = authHeader.split(' ')[1] || authHeader;
        const decodedToken = decodeAccessToken(token);
        const userId = decodedToken.id;
        
        const { pinId } = req.params.pinId
        const { boardId } = req.body;
        if (!boardId || !pinId) return res.status(400).json({ message: 'Board ID and Pin ID are required' });
       
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        if (board.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Board' });
        }

        const pin = await Pin.findById(pinId);
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        const Updatedboard = await Board.findByIdAndUpdate(
            boardId,
            { $addToSet: { pins: pinId } }, // Prevents duplicates
            { new: true }
        );

        if (!Updatedboard) return res.status(404).json({ message: 'Board not updated', error: error.message });

        res.status(201).json({ success: true, message: 'Pin added in board successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const removePin = async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
        }
    
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        const decodedToken = decodeAccessToken(token);
        const userId = decodedToken.id;

        const { pinId } = req.body;
        const boardId = req.params.boardId
        if (!boardId || !pinId) return res.status(400).json({ message: 'Board ID and Pin ID are required' });

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        if(board.userId.toString() !== userId){
            return res.status(403).json({ success: false, message: 'Forbidden: You do not own this Board' });
        }

        const pin = await Pin.findById(pinId);
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        const Updatedboard = await Board.findByIdAndUpdate(boardId, { $pull: { pins: pinId } }, { new: true });
        if (!Updatedboard) return res.status(404).json({ message: 'Board not found or not updated' });

        res.status(200).json({ success: true, message: 'Pin removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const loadPin = async (req, res) => {
    try {
        const { boardId } = req.params;
        const { page=1, limit=20 } = req.query;

        const board = await Board.findById(boardId)
             .lean();

        if(!board){
            return res.status(404).json({ message: "Board not found" });
        }

        const pin = await Pin.find({ _id: { $in: board.pins}})
         .sort({ createdAt: -1})
         .skip((page - 1)*limit)
         .limit(Number(limit))
         .lean()

        res.status(200).json({ success: true, board, pin });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = { createBoard, retrieveBoards, deleteBoard, addPin, removePin, loadPin };