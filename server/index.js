import { MongoClient } from 'mongodb';

const password = process.env.PASSWORD;
console.log(process.env.PASSWORD);

const uri = `mongodb+srv://cesar:${password}@cluster0.ckpae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("MundoDasLetras").collection("devices");
    console.log(collection.find({}));
  // perform actions on the collection object
  client.close();
});
