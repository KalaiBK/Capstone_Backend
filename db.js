const mongoose = require("mongoose");
require("dotenv").config();

// Mongo DB URL
const MONGO_URI = process.env.ENV == "DEV" ? process.env.DB_HOST_LOCAL : process.env.DB_HOST_PROD;

// Connect with MongoDB with the above URL
const connectDB = async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB...")
}

module.exports = connectDB;