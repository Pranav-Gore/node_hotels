// Import the required modules
const express = require("express");
const bodyparser = require("body-parser");

// Create an instance of the Express application
const app = express();

// Import the database connection and the person model
const db = require("./db.js");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyparser.json());

// Define a route for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to our restaurant..how can I help you?");
});

const personRoutes = require('./Routes/personRoutes.js');
app.use('/person',personRoutes);

const menuItemRoutes = require('./Routes/menuItemRoutes.js');
app.use('/menuItem',menuItemRoutes);

// Start the server and listen on port 3000
app.listen(PORT, () => {
    console.log("Server is running on port on 3000");
})  