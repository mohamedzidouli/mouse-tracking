const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");




const app = express();

const cors = require('cors');
app.use(cors());
const port = 3000;

const uri = "mongodb+srv://med:medmed0909@cluster0.lhchdj4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err);
  }
}

connectToDB();

app.use(express.json());

// POST endpoint for adding a new user
app.post("/users", async (req, res) => {
  try {
    const db = client.db("mydb");
    const users = db.collection("users");
    const { id, name, email } = req.body; // Destructure new fields from request body
    const result = await users.insertOne({ id, name, email }); // Add new fields to the object being stored
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/data", async (req, res) => {
  try {
    const db = client.db("mydb");
    const data = db.collection("data");
    const value = req.body; 
    const result = await data.insertOne({ value }); 
    res.status(201).send(value); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint for retrieving all users
app.get("/users", async (_, res) => {
  try {
    const db = client.db("mydb");
    const users = db.collection("users");
    const result = await users.find({}, { projection: { _id: 0, id: 1, name: 1, email: 1 } }).toArray(); // Specify fields to return
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function createDatabaseAndCollection() {
    try {
      // Connect to the client
      await client.connect();
  
      // Create a database named "mydb"
      const db = client.db("mydb");
  
      // Check if the collection "users" already exists
      const collections = await db.listCollections().toArray();
      const collectionExists = collections.some(
        (collection) => collection.name === "users",
        (collection) => collection.name === "data"
      );
      if (collectionExists) {
        console.log("Collection already exists");
        return;
      }
  
      // Create a collection named "users"
      await db.createCollection("users");
      await db.createCollection("data");
  
      console.log("Successfully created database and collection!");
    } catch (err) {
      console.error(err);
    } finally {
      // Close the client
    }
  }

createDatabaseAndCollection(); 



