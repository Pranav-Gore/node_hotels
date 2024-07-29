const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        required:true,
        enum:["sweet","spicy","sour"]
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingrediance:{
        type:[String],
        required:true,
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const menuItems = mongoose.model("menuItem",menuItemSchema)
module.exports = menuItems;