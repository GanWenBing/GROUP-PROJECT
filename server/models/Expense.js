const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : [true,"User Id is valid"]
    }
},
{
    timestamps: true,
  }
  )

module.exports = mongoose.model("Expense",expenseSchema);