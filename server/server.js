require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const PORT = process.env.PORT ?? 3000;
const saltRounds = 10;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get("/api/users/seed", async (req, res) => {
    await User.deleteMany({});
  
    const users = await User.insertMany([
      {
        username: "admin",
        password: bcrypt.hashSync("123", saltRounds),
      },
    ]);
    res.json(users);
  });

app.post("/api/login", async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    // User.findById()
    const user = await User.findOne({username});
    if(user===null){
      res.status(401).json({msg:"no user"})
      return;
    }
    //const hash = user.password
    const loginPass = bcrypt.compareSync(password, user.password);
    if(loginPass){
        res.status(200).json({msg:"Login route"});
    }else{
        res.status(401).json({msg:"Not ok"})
    }
  });


mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  });