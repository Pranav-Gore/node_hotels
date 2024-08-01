const mongoose = require("mongoose");
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true // Use only if you understand the security implications
})

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});

db.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
});

module.exports = db;
