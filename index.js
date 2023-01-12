const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

require("dotenv").config();

// code for middleware
app.use(cors());
app.use(express.json());

//mongodb setup

// db_pass: K7dS2AUpscBk1Ioe;

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.jz1qjld.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    const taskCollection = client.db("dailyTask").collection("task-list");
    const ServerCallCollection = client
      .db("dailyTask")
      .collection("serverCallCount");

    //post method for task update

    app.post("/addtask", async (req, res) => {
      const query = req.body;
      const result = await taskCollection.insertOne(query);
      console.log("task added", result);
      res.send(result);
    });

    //post method for server interaction count
    app.post("/add-respons-count", async (req, res) => {
      const query = req.body;
      const result = await ServerCallCollection.insertOne(query);
      console.log("task added", result);
      res.send(result);
    });
    app.get("/alltask", (req, res) => {
      const query = {};
      const result = taskCollection.find(query).toArray();
      console.log("task added", result);
      res.send(result);
    });

    // Ensures that the client will close when you finish/error
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running Perfectly");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
