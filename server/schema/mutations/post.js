const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const Post = require('../../models/post');
const PostType = require('../types/post_type');
const CommentType = require('../types/comment_type');

const _ = require('lodash')

const postMutate = {
  newPost: {
    type: PostType,
    args: {
      subject: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString }
    },
    resolve(obj, { subject, description }, context) {
      if (!context.req.user && !context.req.token) { throw new Error("您尚未登入！") }
      const data = {
        creator: context.req.user._id,
        subject,
        description
      }
      const post = new Post(data);
      return post.save()
    }
  }
}

module.exports = { postMutate };