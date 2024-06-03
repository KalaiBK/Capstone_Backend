const mongoose = require("mongoose");

// Creating Schema for Customer Details
const customerDetailsScheme = new mongoose.Schema({
    name : { type: String, required: true },
    gender : { type: String, required: true },
    mobile_number : { type: BigInt, required: true },
    email_id : { type: String, required: true },
    address : { type: String, required: true },
    pieChartData: {type: Array, required: true},
    barChartXAxis: {type: Array, required: true},
    barChartSeries: {type: Array, required: true}
});

// Creating Model for Customer Schema
module.exports = mongoose.model("Customer_Details", customerDetailsScheme);