const express= require("express");
const app = express();


const path = require("path");

const port = 3000;
app. use(express.json());// for parsing 
app.use(express.urlencoded({extended:true}))//data by id aa jaye 
app.set("view engine","ejs");
const static_path = path.join(__dirname,"../views");//pura path dena hota hai 
app.use(express.static(static_path));
//const methodoverride = require("method-override"); // for put patch and delete method
//app.use(methodoverride("_method"));
const ejsmate = require("ejs-mate");
app.engine("ejs",ejsmate)
const bodyParser = require('body-parser');

const methodoverride = require("method-override"); // for put patch and delete method
app.use(methodoverride("_method"));

app.listen(port,()=>{
    console.log(`app listing on port ${port}`)
})
require('./src/db/connect.js');
const User = require('./src/model/user.js');

app.get('/',(req,res)=>{
    res.render("index.ejs")
})
app.get('/adduserdata',(req,res)=>{
    res.render('adduser.ejs')
})





//////post route ///
app.post("/userinput",async(req,res)=>{
    const{name,email,mobile} = req.body;
    console.log(name,email,mobile);
    const userdata = new User({
        name,email,mobile
    });
    const save =  await userdata.save();
console.log(save)
res.render('/')


})