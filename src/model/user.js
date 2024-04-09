const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
name:String,
mobile:String,
email:String



})
module.exports= new mongoose.model("User",userSchema);

