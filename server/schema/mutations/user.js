const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const UserType = require('../types/user_type');
const User = require('../../models/user');

const Post = require('../../models/post');
const PostType = require('../types/post_type');
const CommentType = require('../types/comment_type');

const _ = require('lodash')



const userMutate = {
  signup: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(obj, args, context) {
      const user = new User(args);
      return Promise.all([user.save(), user.generateAuthToken()])
        .then(([user, { token }]) => {
          context.res.header('authToken', token)
          return user;
        })
        .catch(err => {
          if (err.code) { throw new Error("信箱已有人使用！") }
          console.log(err.code);
        })
    }
  },
  login: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(obj, { email, password }, context) {
      return User.findByCredentials(email, password)
        .then(user => {
          context.req.user = user;
          return user.generateAuthToken();
        })
        .then(({ token }) => {
          context.res.header('authToken', token)
          return context.req.user
        })
        .catch(err => {
          throw new Error(err);
        })
    }
  },
  logout: {
    type: UserType,
    resolve(obj, args, context) {
      if (!context.req.user && !context.req.token) { throw new Error("您尚未登入！") }
      return context.req.user.update({
        $pull: {
          tokens: { token: context.req.token }
        }
      }).then((result) => {
        return context.req.user;
      }).catch(err => {
        throw new Error(err);
      })
    }
  }
}

module.exports = { userMutate };