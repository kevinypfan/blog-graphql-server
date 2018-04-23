const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now()
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;