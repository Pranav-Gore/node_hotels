const mongoose = require("mongoose");

//define the mongoDB connection URL
const mongoURL="mongodb://localhost/hotels";

//set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//get the default connection
//mongoose maintain a default connection object represented the mongoDB connection
const db = mongoose.connection;

//define event listener for database connection

db.on("connected",()=>{
    console.log("connected to mongoDB server");
})

db.on("error",()=>{
    console.log("mongoDB connection error");
})

db.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})

module.exports = db;