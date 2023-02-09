const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ConfirmPassword: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);