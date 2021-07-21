import { MongoClient } from 'mongodb';

const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.ckpae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const databaseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

async function createUseDatabase() {
  const client = new MongoClient(uri, databaseConfig);
  await client.connect()
  const database = client.db('MundoDasLetras');
  return function() {
    return database;
  };
}

export const useDatabase = await createUseDatabase();
