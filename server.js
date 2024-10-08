var express = require('express');
var { graphql, buildSchema } = require("graphql");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server")
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
    randomFloat: Float!
    isOver18: Boolean
    fruits: [String!]!
  }
`)
 
// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello() {
    return "Hello world!"
  },
  age: () => {
    return 25;
  },
  randomFloat(){
    return Math.random()
  },
  isOver18: true,
  fruits(){
    return ['Apple', 'Banana', 'Pear'];
  }
}
 
// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ age }",
  rootValue
}).then(response => {
  console.log(response)
})

const app = express();

app.all('/graphql', 
    createHandler({ 
        schema: schema, 
        rootValue: rootValue
    })
);

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000);
console.log(`
    Running a GraphQL API server at http://localhost:4000
    Test: http://localhost:4000/graphql?query={hello,age} 
`)