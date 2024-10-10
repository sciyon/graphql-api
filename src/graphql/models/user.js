import { ObjectId } from "mongodb";

export const typeDef = /* GraphQL */ `
    type Query{
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(user: new_user!): User
        deleteUser(id: ID!): Boolean
        updateUser(id: ID!, update: update_user): User
    }

    input new_user{
        name: String!
        email: String!
    }

    input update_user{
        name: String!
    }

    type User {
        id: ID!
        name: String
        email: String
    }
`

export const resolvers = {
    Query: {
        users: async(_, args, { mongo }) => {
            return mongo.users.find().limit(20).toArray();
        },

        user: async (obj, { id }, { mongo }) => {
            return mongo.users.findOne( { _id: new ObjectId(id) });
        }
    },

    User: {
        id: ({ id, _id }) => _id || id,
        name: (obj) => {
            return obj.name.toUpperCase()
        }
    },

    Mutation: {
        createUser: async(_, { user }, { mongo }) => {
            console.log(user);
            
            const res = await mongo.users.insertOne(user);
            console.log(res);
            console.log(user);
            return{
                id: res.insertedId,
                ...user,
            }
        },
        deleteUser: async(_, { id }, { mongo }) => {
            await mongo.users.deleteOne({ _id: new ObjectId(id) })
            return true;
        },
        updateUser: async(_, { id, update }, { mongo }) => {
            const res = await mongo.users.updateOne(
                { _id: new ObjectId(id) }, 
                { $set: { name: update.name}}
            )
            return mongo.users.findOne({_id: new ObjectId(id)})
        }
    }
}