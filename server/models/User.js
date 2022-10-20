const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Username: String,
    Password: String,
    ConfirmPassword: String,
    Email: String
})

const User = mongoose.model("User",userSchema);

module.exports = User;