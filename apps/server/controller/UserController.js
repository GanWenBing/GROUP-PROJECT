const express = require("express");

const router = express.Router();
const User = require("../models/User")
//const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateToken = require("../generateToken")

router.get("/users/seed", async (req, res) => {
  await User.deleteMany({});

  const users = await User.insertMany([
    {
      Username: "admin",
      Password: bcrypt.hashSync("123", saltRounds),
      ConfirmPassword: bcrypt.hashSync("123", saltRounds),
      Email: "admin@ga.com"
    },
  ]);
  res.json(users);
});


router.post("/CreateAccount", async (req, res) => {
  const { Username, Password, ConfirmPassword, Email } = req.body;
  const encryptedPassword = await bcrypt.hash(Password, saltRounds);
  const encryptedConfirmPassword = await bcrypt.hash(ConfirmPassword, saltRounds);
  var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  try {
    if (Password !== ConfirmPassword) {
      return res.status(401).json({ error: "Password did not match" })
    }
    if (!validate.test(Email)) {
      return res.status(401).json({ error: "invalid email address" })
    }
    const existedEmail = await User.findOne({ Email });
    if (existedEmail) {
      return res.status(401).json({ error: "Email is registered" })
    }
    const existUser = await User.findOne({ Username });
    if (existUser) {
      return res.status(401).json({ error: "User Exists" })
    }
    if (Username === "" || Password === "") {
      return res.status(401).json({ error: "Invalid" })
    }
    const user = await User.create({
      Username,
      Password: encryptedPassword,
      ConfirmPassword: encryptedConfirmPassword,
      Email
    });
    if (user)
      res.status(200).json({
        msg: 'ok',
        id: user._id,
        Username: user.Username,
        Password: user.Password,
        Email: user.Email,
        token: generateToken(user.id)
      })
  } catch (error) {
    res.status(401).json('error')
  }
})

router.post("/login", async (req, res) => {
  console.log(req.body)
  // const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: '1 day' })
  // console.log(token)
  const { Username, Password } = req.body;
  // User.findById()
  const user = await User.findOne({ Username });
  if (user === null) {
    res.status(401).json({ msg: "no user" })
    return;
  }
  //const hash = user.password
  const loginPass = bcrypt.compareSync(Password, user.Password);
  if (loginPass) {
    res.status(200).json({ msg: "Login route", id: user._id, token: generateToken(user.id) });
  } else {
    res.status(401).json({ msg: "Not ok" })
  }
});


router.get("/listusers", async (req, res) => { // Start of get
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundUsers);
  });
});


router.get("/user/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
})

router.put("/userupdate/:id", async (req,res) => {
  const { id } = req.params;
  const Username = req.body.Username;
  const Password = await bcrypt.hash(req.body.Password, saltRounds);
  const ConfirmPassword = await bcrypt.hash(req.body.ConfirmPassword, saltRounds);
  const Email = req.body.Email;
  var validated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  try{
    const existedUser = await User.findOne({ Username });
    const existedEmail = await User.findOne({Email});
  // if(req.body.Password!= req.body.ConfirmPassword){
  //   return res.status(401).json({ error: "Password did not match" })
  // }
  // else if
  if(!validated.test(Email)){
    return res.status(401).json({ error: "invalid email address" });
  }
  
  if(existedEmail){
    if(!(existedEmail.id == id)){
      return res.status(401).json({ error: "Email is registered" })
  }
}
  
  if (existedUser) {
    if(!(existedUser.id==id)){
      return res.status(401).json({ error: "User Exist" })
    }  
  }

  User.findByIdAndUpdate(id, { $set: { Username: Username, Password: Password, ConfirmPassword: ConfirmPassword, Email: Email } }, (err, updated) => {
    if (err) {
      res.status(401).json({ error: err.message });
    }
    else {
      res.status(200).json(updated);
    }
  })
}
catch(error){
  return res.status(401).json("error")
}
})



module.exports = router;

