const GraphQLNonNull = require('graphql').GraphQLNonNull
const GraphQLString = require('graphql').GraphQLString
const bookType = require('./../../BookType')
const bookModel = require('./../../Book')
exports.addBook = {
  type: bookType.bookType,
  /* define the arguments that we should pass to the mutation
   here we require both book name and the author name 
   the id will be generated automatically 
*/
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args) => {
    //under the resolve method we get our arguments

    const uModel = new bookModel(args)
    const newBook = await uModel.save()
    if (!newBook) {
      throw new Error('error')
    }
    return newBook
  },
}
