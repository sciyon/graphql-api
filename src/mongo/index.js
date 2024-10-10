
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://admin:5RCjsQxhh08YlMxp@cluster0.f06he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setup_database() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db('sample_mflix');
    return {
        client,
        db,
        users: db.collection('users'),
        movies: db.collection('movies'),
        comments: db.collection('comments')
    }
  } catch(err){
    console.log("Error connecting to database.");
    return {}
  }
}