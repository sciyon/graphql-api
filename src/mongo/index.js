
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://admin:5RCjsQxhh08YlMxp@cluster0.f06he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setupDatabase() {
  try {
    await client.connect();
    return {
        client,
    }
  } catch(err){
    console.log('Error in db connection.');
  }
}