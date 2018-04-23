const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const Comment = require('../../models/comment');
const CommentType = require('../types/comment_type');

const commentMutate = {
  addComment: {
    type: CommentType,
    args: {
      postId: { type: new GraphQLNonNull(GraphQLID) },
      message: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(obj, { message, postId }, context) {
      if (!context.req.user && !context.req.token) { throw new Error("您尚未登入！") }
      const data = {
        commentator: context.req.user._id,
        postId,
        message
      }
      const comment = new Comment(data);
      return comment.save()
    }
  }
}

module.exports = { commentMutate };