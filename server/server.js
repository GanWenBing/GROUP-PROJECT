require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User")
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
        Username: "admin",
        Password: bcrypt.hashSync("123", saltRounds),
        ConfirmPassword: bcrypt.hashSync("123", saltRounds),
        Email:"admin@ga.com"
      },
    ]);
    res.json(users);
  });


app.post("/api/CreateAccount", async(req,res)=>{
  const {Username, Password, ConfirmPassword, Email} = req.body;

  const encryptedPassword = await bcrypt.hash(Password,saltRounds);
  const encryptedConfirmPassword = await bcrypt.hash(ConfirmPassword,saltRounds);
  var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  try{
    if(Password!==ConfirmPassword){
      return res.status(401).json({error:"Password did not match"})
    }
    if(!Email.match(validate)){
      return res.status(401).json({error:"invalid email address"})
    }
    const existedUser = await User.findOne({Email});
    if(existedUser){
      return res.status(401).json({error:"User Exists"})
    }
    await User.create({
      Username,
      Password: encryptedPassword,
      ConfirmPassword:encryptedConfirmPassword,
      Email
    });
    res.status(200).json({msg:'ok'})
  }catch(error){
    res.status(401).json('error')
  }
})

app.post("/api/login", async (req, res) => {
    console.log(req.body)
    const {Username, Password} = req.body;
    // User.findById()
    const user = await User.findOne({Username});
    if(user===null){
      res.status(401).json({msg:"no user"})
      return;
    }
    //const hash = user.password
    const loginPass = bcrypt.compareSync(Password, user.Password);
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