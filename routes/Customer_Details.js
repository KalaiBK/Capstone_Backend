const express = require("express");
const router = express.Router();
const addCustomer = require("../models/Customer_Details");

router.post("/add", async(req, res) => {
    // Accessing values from request body
    const { name, email, gender, mobile, address } = req.body;

    try {
        // Find a customer based on email provided in request
        let customer = await addCustomer.findOne({ email_id: email });
        if (customer) {
            // If customer is available throw error
            return res.status(400).json({ message: "Customer already exists" });
        }
        // If customer is not available create a new Customer with provided details
        customer = new addCustomer({ name: name, email_id: email, gender: gender, mobile_number: mobile, address: address, pieChartData: [
            { id: 0, value: Math.floor(Math.random() * Math.floor(100)), label: 'Apparels' },
            { id: 1, value: Math.floor(Math.random() * Math.floor(100)), label: 'Footware' },
            { id: 2, value: Math.floor(Math.random() * Math.floor(100)), label: 'Cosmetics' },
        ],barChartXAxis:[{scaleType: "band", data: ['Apparels', 'Footware', 'Cosmetics']}], barChartSeries: [{ data: [Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10))] }, { data: [Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10))] }, { data: [Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10)), Math.floor(Math.random() * Math.floor(10))] }]});
        // Save the created Customer Details
        await customer.save();
        // Send success response
        res.status(201).json({ message : "Customer added successfully" })
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
})

router.get("/get", async(req, res) => {
    try {
        // Get all the Customer Details available in DB
        const customer_details = await addCustomer.find({});
        // Serialize the data retrieved from DB
        const serializedData = JSON.stringify(customer_details, (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString();
            }
            return value;
        });
        // Send the serialized data as response
        res.send(serializedData);
    } catch (error) {
        // Sending error response in case of error
        res.status(400).send(error);
    }
})


module.exports = router;