const express = require('express');
const engagementController = require('../controllers/engagement-controllers.js');
const router = express.Router();

router.post('/likes', engagementController.toggleLike);
router.get('/pins/:pinId/likes', engagementController.getLikes);

router.post('/comments', engagementController.addComment);
router.delete('/comments/:commentId', engagementController.deleteComment);
router.get('/pins/:pinId/comments', engagementController.getComments);

module.exports = router;