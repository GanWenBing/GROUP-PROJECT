require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const ExpenseController = require("./controller/ExpenseController")
const UserController = require("./controller/UserController")
const CategoryController = require("./controller/CategoryController")
const path = require('path')


const PORT = process.env.PORT || 3000
const MONGO_URI = "mongodb://localhost:27017/ExpenseTracker";
mongoose.connect(MONGO_URI);

app.use(cors())
app.use(express.json())

app.use("/api/expenses", ExpenseController)
app.use("/api/users", UserController)
app.use("/api/categories", CategoryController)

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static("../client/dist"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

mongoose.connection.once("open", () => {

  app.listen(PORT, () => {

  });
});