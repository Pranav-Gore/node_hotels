const express = require('express');
const router = express.Router();

const Person = require("./../models/person");

// Define a POST route to create a new person entry
router.post("/", async (req, res) => {
    try {
        // Get the data from the request body
        const data = req.body;

        // Create a new instance of the person model with the data
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log("Data saved");

        // Send a success response with the saved person data
        res.status(200).json(response);
    } catch (error) {
        // Log the error and send a server error response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Define a GET route to fetch all person entries
router.get("/", async (req, res) => {
    try {
        // Fetch all person documents from the database
        const response = await Person.find({});
        
        // Send a success response with the fetched data
        res.status(200).json(response);
    } catch (error) {
        // Log the error and send a server error response
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Define a GET route to fetch person entries based on work type
router.get("/:workType",async (req,res)=>{
    try {
        const workType = req.params.workType;//extract the workType from the URL parameter
        if(workType == 'chef' || workType =='waiter' || workType  =='manager'){
            const response = await Person.find({work:workType})
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid work type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Define a PUT route to fetch person entries based on id and Update
router.put("/:id",async(req,res)=>{
    try{
        const personId = req.params.id;//extract the id from url parameter
        const updatePersonData = req.body;//update data from thre person

        const response = await Person.findByIdAndUpdate(personId,updatePersonData ,{
            new:true,//return the updated document
            runValidators:true//run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("data successfull updated")
        res.status(200).json(response);
    
    }
    catch(eror){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const personId = req.params.id;//extract the personId from url parameter
        
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"person Not Found"});
        }
        console.log("data deleted successfully");
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;