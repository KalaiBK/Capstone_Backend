const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Creating Schema for User Registration
const userRegistrationScheme = new mongoose.Schema({
    name : { type: String, required: true },
    email_id : { type: String, required: true, uinque: true },
    password : { type: String, required: true }
});

// Converting password from user readable format to encrypted format
userRegistrationScheme.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

//Creating model for User Registration Schema
module.exports = mongoose.model("User_Registeration", userRegistrationScheme);