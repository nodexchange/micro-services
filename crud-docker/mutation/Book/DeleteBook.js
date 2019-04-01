const GraphQLNonNull = require('graphql').GraphQLNonNull
const GraphQLString = require('graphql').GraphQLString
const bookType = require('./../../BookType')
const bookModel = require('./../../Book')

exports.deleteBook = {
  type: bookType.bookType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args) => {
    const removedBook = await bookModel.findByIdAndRemove(args.id)
    if (!removedBook) {
      throw new Error('error')
    }
    return removedBook
  },
}
