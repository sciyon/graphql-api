var express = require('express');
var { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server")
 
// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!):String
//     age: Int
//     randomFloat: Float!
//     isOver18: Boolean
//     fruits: [String!]!
//     rollDice(numDice: Int!, numSides: Int): [Int]
//     user: User
//   }

//   type User{
//     id: Int
//     name: String
//   }
// `)
const User = new GraphQLObjectType({
    name: 'User',
    fields:{
        id:{
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields:{
            hello: {
                type: GraphQLString,
                resolve: ()=>{
                    return "Hello World";
                }
            },

            user: {
                type: User,
                resolve: () =>{
                    return {
                        id: 1,
                        name: 'Erwin'
                    }
                }
            }
        }
    })
})
 
// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: ({name}) => {
//     return "Hello " + name;
//   },//with arguments
//   age: () => {
//     return 25;
//   },
//   randomFloat(){
//     return Math.random()
//   },
//   isOver18: true,
//   fruits(){
//     return ['Apple', 'Banana', 'Pear'];
//   },
//   rollDice({ numDice, numSides }) {
//     var output = []
//     for (var i = 0; i < numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (numSides || 6)))
//     }
//     return output
//   },
//   user: () => {
//     return {
//         id: 1,
//         name: "Erwin"
//     }
//   }
// }
 
// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ age }"
}).then(response => {
  console.log(response)
})

const app = express();

app.all('/graphql', 
    createHandler({ 
        schema: schema
    })
);

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000);
console.log(`
    Running a GraphQL API server at http://localhost:4000
    Test: http://localhost:4000/graphql
`)