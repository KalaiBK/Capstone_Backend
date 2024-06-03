const express = require("express");
const connectDB = require("./db");
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const addCustomerRoute = require("./routes/Customer_Details")
const staffDetailsRoute = require("./routes/Staff_Details");
require("dotenv").config();

// Calling connectDB to create DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Creating routes for the created API
app.use("/auth", authRoutes);
app.use("/customer", addCustomerRoute);
app.use("/staffdetails", staffDetailsRoute);

// Port number for running the API
const PORT = process.env.ENV == "DEV" ? process.env.PORT_LOCAL : process.env.PORT_PROD || 3000
// Start the server in the given port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));