const mongoose = require("mongoose");

// Creating Schema for Staff Details
const staffDetailsScheme = new mongoose.Schema({
    name : { type: String, required: true },
    gender : { type: String},
    mobile_number : { type: BigInt},
    email_id : { type: String, required: true },
    address : { type: String},
    city : { type: String},
    state : { type: String},
    zipcode : { type: BigInt},
    country : { type: String}
});

// Creating Model for Staff Schema
module.exports = mongoose.model("Staff_Details", staffDetailsScheme);