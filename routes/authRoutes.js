const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRegistration = require("../models/User_Registeration");
const staffDetails = require("../models/Staff_Details")
const router = express.Router();
require("dotenv").config();

// JWT secret key based on ENV
const JWT_SECRET = process.env.ENV == "DEV" ? process.env.JWT_SECRET_LOCAL : process.env.JWT_SECRET_PROD;

// To register a user in DB
router.post("/register", async(req, res) => {
    // Accessing values from request body
    const { username, email, password } = req.body;

    try {
        // Find a user based on email provided in request
        let user = await userRegistration.findOne({ email_id: email });
        if (user) {
            // If user is available throw error
            return res.status(400).json({ message: "User already exists" });
        }

        // If user is not availble crate a new user
        user = new userRegistration({ name: username, email_id: email, password: password });
        // Creating Staff details from the provided request body
        let staff = new staffDetails({ name: username, email_id: email, gender : "", mobile_number : "", address : "", city : "", state : "", zipcode : "", country : "" });

        // Saving the created user
        await user.save();
        // Saving the created Staff Details
        await staff.save();
        // Sending success response after saving the details
        res.status(201).json({ message : "User registered successfully" })
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
});

router.post("/login", async(req, res) => {
    // Accessing values from request body
    const { username, password } = req.body;

    try {
        // Find a user based on email provided in request
        let user = await userRegistration.findOne({ email_id: username });
        if (!user) {
            // If user is not available throw error
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // If user is available compare the password given with db password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If password mismatch send error
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // If password match create payload for JWT token
        const payload = {
            id: user._id,
            username: user.name
        }
        // JWT sign with payload, JWT_Secret key and expiry
        jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" },
        (err, token) => {
            // If error occurs in token generation throw error
            if (err) throw err
            // If token is created successfully send success response with token and name
            res.json({ token: token, name: user.name })
        });
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
});

router.post("/changepassword", async(req, res) => {
    // Accessing values from request body
    const { email, oldpassword, newpassword } = req.body;
    try {
        // Find a user based on email provided in request
        let user = await userRegistration.findOne({ email_id: email });
        if (!user) {
            // If user is not available throw error
            return res.status(400).json({ message: "Something went wrong. Please try after some time." });
        }

        // If user is available compare the password given with db password
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            // If password mismatch send error
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // Assign new password to user object
        user.password = newpassword;
        // Save user details to DB
        await user.save();
        // Send success response
        res.status(201).json({ message: "Password has been changed successfully" })
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
});

router.get("/logout", (req, res) => {
    // Sending response for logout
    res.json({ message: "User logged out successfully" });
});

module.exports = router;