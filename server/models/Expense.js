const mongoose = require("mongoose")
<<<<<<< HEAD
=======
const {User} = require("./User")
console.log(User)
>>>>>>> bce4fda5830c0397e999fc8a1a55a722f6ef5cb7

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
<<<<<<< HEAD

        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category"
=======
>>>>>>> bce4fda5830c0397e999fc8a1a55a722f6ef5cb7
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