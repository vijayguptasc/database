const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/fruitsDB";
 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
// declare database & collection working with
const db = "fruitsDB";
const coll = "fruits";
 
/* main function that runs commands */
async function main() {
  try {
    // connect
    await client.connect();
    console.log("Successfully connected to MongoDB.");
 
    //insert a fruit
    await addFruits(client,[
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great stuff!"
      }
    ])
 
    // find and log all fruit in the database
    await findAllFruits(client);
 
  } catch (e) {
    console.log("Error caught: " + e)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
main().catch(console.dir);
 
async function addFruit(client, newFruit){
  const result = await client.db(db).collection(coll).insertOne(newFruit);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}
 
async function addFruits(client, newFruitsArray){
  const result = await client.db(db).collection(coll).insertMany(newFruitsArray);
  console.log(`${result.insertedCount} listing(s) created with the following ID(s):`);
  console.log(`${result.insertedIds}`)
}
 
async function findAllFruits(client){
  const results = await client.db(db).collection(coll).find().toArray();
  console.log("Found the following fruits");
  console.log(results);
}