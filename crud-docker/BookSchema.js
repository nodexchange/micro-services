const GraphQLSchema = require('graphql').GraphQLSchema
const GraphQLObjectType = require('graphql').GraphQLObjectType
const query = require('./BookQuery').BookQuery
const mutation = require('./mutation/BookMutations')

exports.BookSchema = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation,
  }),
})
