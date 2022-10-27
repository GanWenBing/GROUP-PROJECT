const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: { 
    type: String, 
    required: true },
  
});

module.exports = mongoose.model("Category", categorySchema);