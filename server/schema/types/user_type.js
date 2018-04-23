const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');


const TokenType = new GraphQLObjectType({
  name: 'TokenType',
  fields: {
    token: { type: GraphQLID },
    id: { type: GraphQLID }
  }
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    tokens: { type: new GraphQLList(TokenType) }
  })
})

module.exports = UserType;