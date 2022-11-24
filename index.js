const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dafmrk2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const cat1 = client.db("BookCategory").collection("Action and Adventure");
const cat2 = client.db("BookCategory").collection("Classics");
const cat3 = client.db("BookCategory").collection("Memoir");
const users = client.db("users").collection("signedUsers");
app.get("/cat1", async (req, res) => {
  const query = {};
  const cursor = cat1.find(query);
  const allCat1Books = await cursor.toArray();
  res.send(allCat1Books);
});
app.get("/cat2", async (req, res) => {
  const query = {};
  const cursor = cat2.find(query);
  const allCat2Books = await cursor.toArray();
  res.send(allCat2Books);
});
app.get("/cat3", async (req, res) => {
  const query = {};
  const cursor = cat3.find(query);
  const allCat3Books = await cursor.toArray();
  res.send(allCat3Books);
});

app.post("/userInfo", async (req, res) => {
  const userInfo = req.body;
  const result = await users.insertOne(userInfo);
  res.send(result);
});

app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
