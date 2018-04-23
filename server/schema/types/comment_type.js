const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLScalarType
} = require('graphql');

const { GraphQLDate } = require('graphql-iso-date');

const UserType = require('./user_type');
const PostType = require('./post_type');

const User = require('../../models/user');
const Post = require('../../models/post');


const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    commentator: {
      type: UserType,
      resolve(obj, args, context) {
        return User.findOne({ _id: obj.commentator })
      }
    },
    createAt: { type: GraphQLDate },
    postId: {
      type: PostType,
      resolve(obj, args, context) {
        console.log(obj)
        return Post.findOne({ _id: obj.postId })
      }
    },
    message: { type: GraphQLString }
  })
})

module.exports = CommentType;