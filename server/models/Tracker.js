const mongoose = require("mongoose")

const trackerSchema = mongoose.Schema({
    Name: String, // Name of expense or income
    Income: Boolean, // if true, income. If false, track as expense 
    Amount: Number,
    Category: String,
    Description: String
})

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;