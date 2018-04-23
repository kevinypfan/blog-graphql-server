const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLScalarType
} = require('graphql');

const { GraphQLDate } = require('graphql-iso-date');

const User = require('../../models/user');
const Comment = require('../../models/comment');


const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLID },
    creator: {
      type: require('./user_type'),
      resolve(obj, args, context) {
        return User.findOne({ _id: obj.creator });
      }
    },
    createAt: { type: GraphQLDate },
    subject: { type: GraphQLString },
    description: { type: GraphQLString },
    comments: {
      type: new GraphQLList(require('./comment_type')),
      resolve(obj, args, context) {
        return Comment.find({ postId: obj._id })
      }
    }
  })
})

module.exports = PostType;