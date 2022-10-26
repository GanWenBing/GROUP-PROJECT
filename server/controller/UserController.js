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
    if (!Email.match(validate)) {
      return res.status(401).json({ error: "invalid email address" })
    }
    const existedUser = await User.findOne({ Email });
    if (existedUser) {
      return res.status(401).json({ error: "User Exists" })
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


module.exports = router;