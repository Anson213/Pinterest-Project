const mongoose = require('mongoose');
const Pin = require('../data-models/pinSchema.js');
const Like = require('../data-models/likeSchema.js');
const Comment = require('../data-models/commentSchema.js');
const { decodeAccessToken } = require('../utility-services/jsonTokens');

// --- Like APIs ---

const toggleLike = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return res.status(401).json({ success: false, message: 'Access denied, token missing!' });
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      const decodedToken = decodeAccessToken(token);
      const userId = decodedToken.id;
  
      const { pinId } = req.body;
      if (!pinId) return res.status(400).json({ success: false, message: 'Pin ID is required' });
  
      const pin = await Pin.findById(pinId);
      if (!pin) return res.status(404).json({ success: false, message: 'Pin not found' });
  
      const existingLike = await Like.findOne({ userId, pinId });
      if (existingLike) {
        await Like.findOneAndDelete({ userId, pinId });
        return res.status(200).json({ success: true, message: 'Like removed', liked: false });
      } else {
        const newLike = new Like({ userId, pinId });
        await newLike.save();
        return res.status(201).json({ success: true, message: 'Pin liked', liked: true });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

const getLikes = async (req, res) => {
  try {

    let likedByUser = false;
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      const decodedToken = decodeAccessToken(token);
      const userId = decodedToken.id;
      const like = await Like.findOne({ userId, pinId });
      likedByUser = like !== null;
    }

    const { pinId } = req.params;
    if (!pinId) {
      return res.status(400).json({ success: false, message: 'Pin ID is required' });
    }

    const pin = await Pin.findById(pinId);
    if (!pin) {
      return res.status(404).json({ success: false, message: 'Pin not found' });
    }

    const likes = await Like.find({ pinId })
      .populate('userId', 'name') // Optionally include user names
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalLikes: likes.length,
      liked: likedByUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// --- Comment APIs ---

const addComment = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Access denied, token missing!' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;

    const { pinId, content } = req.body;
    if (!pinId || !content) {
      return res.status(400).json({ success: false, message: 'Pin ID and comment content are required' });
    }

    const pin = await Pin.findById(pinId);
    if (!pin) {
      return res.status(404).json({ success: false, message: 'Pin not found' });
    }

    const newComment = new Comment({ userId, pinId, content });
    await newComment.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: {
        id: newComment._id,
        content: newComment.content,
        userId: newComment.userId,
        createdAt: newComment.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Access denied, token missing!' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const decodedToken = decodeAccessToken(token);
    const userId = decodedToken.id;

    const { commentId } = req.params;
    if (!commentId) {
      return res.status(400).json({ success: false, message: 'Comment ID is required' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { pinId } = req.params;
    if (!pinId) {
      return res.status(400).json({ success: false, message: 'Pin ID is required' });
    }

    const pin = await Pin.findById(pinId);
    if (!pin) {
      return res.status(404).json({ success: false, message: 'Pin not found' });
    }

    const comments = await Comment.find({ pinId })
      .populate('userId', 'name') // Optionally include user names
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments: comments.map(comment => ({
        id: comment._id,
        content: comment.content,
        userId: comment.userId._id,
        username: comment.userId.name,
        createdAt: comment.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  toggleLike,
  getLikes,
  addComment,
  deleteComment,
  getComments,
};