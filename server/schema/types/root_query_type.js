const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('./user_type');
const Post = require('../../models/post');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(obj, args, context) {
        if (!context.req.user && !context.req.token) { throw new Error("您尚未登入！") }
        return context.req.user
      }
    },
    posts: {
      type: new GraphQLList(require('./post_type')),
      resolve(obj, args, context) {
        return Post.find();
      }
    }
  }
});

module.exports = RootQueryType;
