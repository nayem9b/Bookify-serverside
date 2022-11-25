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
const books = client.db("Books").collection("CategoryBooks");
const usersCollection = client.db("users").collection("signedUsers");
const sellerAddedProductCollection = client
  .db("users")
  .collection("addedProduct");
const AdvertisedProductCollection = client
  .db("users")
  .collection("advertisedProduct");

const verifyAdmin = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await usersCollection.findOne(query);
  if (user?.role !== "admin") {
    return res.status(403).send({
      message: "forbidden access",
    });
  }
  next();
};

app.get("/category/action_and_adventure", async (req, res) => {
  const action_and_adventure = await books
    .find({ category: "Action_and_Adventure" })
    .toArray();
  res.send(action_and_adventure);
});
app.get("/category/classics", async (req, res) => {
  const classics = await books
    .find({
      category: "Classics",
    })
    .toArray();
  res.send(classics);
});
app.get("/category/memoir", async (req, res) => {
  const memoir = await books
    .find({
      category: "Memoir",
    })
    .toArray();
  res.send(memoir);
});
// app.get("/users/sellers", async (req, res) => {
//   const user = await usersCollection.find({ role: "Seller" }).toArray();
//   res.send(user);
// });
app.post("/userInfo", async (req, res) => {
  const userInfo = req.body;
  const result = await usersCollection.insertOne(userInfo);
  res.send(result);
});
// Get all the users
app.get("/users", async (req, res) => {
  const query = {};
  const users = await usersCollection.find(query).toArray();
  res.send(users);
});

// Get admin
app.get("/users/admin/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isAdmin: user?.role === "admin" });
});
// Find all the sellers
app.get("/users/sellers", async (req, res) => {
  const user = await usersCollection.find({ role: "Seller" }).toArray();
  res.send(user);
});
// Find all the sellers
app.get("/users/buyers", async (req, res) => {
  const user = await usersCollection.find({ role: "Buyer" }).toArray();
  res.send(user);
});

// Check if its Buyer
app.get("/users/buyer/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isBuyer: user?.role === "Buyer" });
});
// Check if its Seller
app.get("/users/seller/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isSeller: user?.role === "Seller" });
});

// delete perticular user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const result = await usersCollection.deleteOne({ _id: ObjectId(id) });
  res.send(result);
});

// Post a product
app.post("/addedProducts", async (req, res) => {
  const product = req.body;
  const result = await sellerAddedProductCollection.insertOne(product);
  res.send(result);
});
// Delete a product from MyProducts
app.delete("/myproducts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await sellerAddedProductCollection.deleteOne({
    _id: ObjectId(id),
  });
  res.send(result);
});
// Get all product that seller has posted
app.get("/myproducts", async (req, res) => {
  const query = {};
  const products = await sellerAddedProductCollection.find(query).toArray();
  res.send(products);
});
// Advertise the product
app.get("/myproduct/:id", async (req, res) => {
  const productid = req.params.id;
  const query = { _id: ObjectId(productid) };
  const singleProduct = await sellerAddedProductCollection.findOne(query);
  res.send(singleProduct);
});
app.post("/myproduct/:id", async (req, res) => {
  const product = req.body;
  const singleProduct = await AdvertisedProductCollection.insertOne(product);
  res.send(singleProduct);
});
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
