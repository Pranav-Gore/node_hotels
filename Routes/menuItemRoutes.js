const express = require('express');
const router = express.Router();

const menuItems = require("./../models/menuItem.js")

// Define a POST route to create a new menu item entry
router.post("/", async (req, res) => {
    try {
        const menudata = req.body;

        const menuitem = new menuItems(menudata);

        const response1 = await menuitem.save();
        console.log("data saved");

        res.status(200).json(response1);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Define a GET route to fetch all menu item entries
router.get("/", async (req, res) => {
    try {
        const response1 = await menuItems.find({});
        res.status(200).json(response1);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:taste",async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == 'sweet'|| taste == 'spicy' || taste == 'sour'){
            const response = await menuItems.find({taste:taste});
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid taste type"});
        }
    }
    catch{
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const menuItemId = req.params.id;
        const updatemenuItemData = req.body;

        const response = await menuItems.findByIdAndUpdate(menuItemId,updatemenuItemData,{
            new:true,
            runValidators :true
        });
        if(!response){
          return  res.status(404).json({error:"Menu item not found"});
        }
        console.log("data updated succesfully");
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const menuItemId = req.params.id;

        const response = await menuItems.findByIdAndDelete(menuItemId);
        if(!response){
            return  res.status(404).json({error:"Menu item not found"});
          }
          console.log("data deleted succesfully");
          res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;