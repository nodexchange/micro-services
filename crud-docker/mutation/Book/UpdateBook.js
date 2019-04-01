const GraphQLNonNull = require('graphql').GraphQLNonNull
const GraphQLString = require('graphql').GraphQLString
const bookType = require('./../../BookType')
const bookModel = require('./../../Book')

exports.updateBook = {
  type: bookType.bookType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args) => {
    const UpdatedBook = await bookModel.findByIdAndUpdate(args.id, args)
    if (!UpdatedBook) {
      throw new Error('Error')
    }
    return UpdatedBook
  },
}
