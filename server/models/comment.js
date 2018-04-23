const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now()
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;