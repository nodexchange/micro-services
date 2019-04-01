const express = require('express')
const app = express()
const mongoose = require('mongoose')

// graphql
const graphqlExpress = require('express-graphql')
const bookSchema = require('./BookSchema').BookSchema

// // connecting to mongodb
// mongoose.connect(dbURI)
mongoose.connect(
  'mongodb://mongo/cruddockernmongo',
  { server: { auto_reconnect: true } },
  err => {
    if (err) throw err
    console.log('>>_+_+_+_+_+>>>>> connected to mongo')
  }
)
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, res) => res.send('Hello World!'))

//add the schema to graphql-express
app.use(
  '/graphql',
  graphqlExpress({
    schema: bookSchema,
    rootValue: global,
    graphiql: true,
  })
)
