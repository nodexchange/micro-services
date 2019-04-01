const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLList = require('graphql').GraphQLList
//import book model
const BookModel = require('./Book')
//import GraphQL BookType
const bookType = require('./BookType').bookType

// Query
exports.BookQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      books: {
        type: new GraphQLList(bookType),
        resolve: async () => {
          const books = await BookModel.find()
          if (!books) {
            throw new Error('error while fetching data')
          }
          return books
        },
      },
    }
  },
})
