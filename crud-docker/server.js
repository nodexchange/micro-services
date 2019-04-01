const express = require('express')
const app = express()
const mongoose = require('mongoose')

// graphql
const graphqlExpress = require('express-graphql')
const bookSchema = require('./BookSchema').BookSchema

//add the schema to graphql-express
app.use(
  '/graphql',
  graphqlExpress({
    schema: bookSchema,
    rootValue: global,
    graphiql: true,
  })
)

// // connecting to mongodb
mongoose.connect('mongodb://mongo/cruddocker', err => {
  if (err) throw err
  console.log('connected to mongo')
})
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
