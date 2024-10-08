import express from 'express'
import { ruruHTML } from 'ruru/server'
import { createYoga, createSchema } from 'graphql-yoga'

const yoga = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => 'Hello from Yoga!'
        }
      }
    })
})

const app = express()    
app.all('/graphql', yoga)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000);

console.log(`
    Running a GraphQL API server at http://localhost:4000
    Test: http://localhost:4000/graphql
`)