const express = require("express");
const router = express.Router();
const staffDetails = require("../models/Staff_Details");

router.post("/get", async(req, res) => {
    // Accessing values from request body
    const { email } = req.body;
    try {
        // Find Staff Details based on email provided in request
        const details = await staffDetails.find({ email_id: email });
        // Serialize the retrieved data from DB
        const serializedData = JSON.stringify(details, (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString();
            }
            return value;
        });
        // Send the serialized data as response
        res.status(201).send(serializedData);
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
});

router.post("/update", async(req, res) => {
    // Accessing values from request body
    const { _id, name, email, gender, mobile, address, city, state, country, zipcode } = req.body;
    // Find and update the Staff Details based on the request _id
    staffDetails.findOneAndUpdate(
        { _id: _id },
        { _id: _id, name: name, gender: gender, mobile_number: mobile, email_id: email, address: address, city: city, state: state, zipcode: zipcode, country: country },
        { new: true, runValidators: true }
        )
        .then(updatedUser => {
            // Send Success response
        res.status(201).json({ message : "User updated successfully" })
        })
    .catch (error => {
        // Sending error response in case of error
        res.status(400).send(error);
});
});


module.exports = router;