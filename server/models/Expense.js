const mongoose = require("mongoose")
const {User} = require("./User")
console.log(User)

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
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
    // userid: {
    //     type: String,
    //     required: true
    // }
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