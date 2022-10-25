const mongoose = require("mongoose")

const trackerSchema = mongoose.Schema({
    Name: String, // Name of expense or income
    Amount: Number, // Negative = expense, Positive = income 
    Category: String,
    Description: String // Optional
})

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;