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
app.get('/showuser', async(req,res)=>{
    const users =await User.find({})
    res.render('showuser.ejs',{users})
})
 
app.get('/edit-user', async (req, res) => {
    try {
        
        const user = await User.findById(req.query.id); // Get the user by ID from the query parameter
        console.log(user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edituser', { user }); // Render the edit-user page with the user data
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});





//////post route ///



// POST route to handle editing a user
app.post('/edit-user', async (req, res) => {
    try {
        const { id, name, email, mobile } = req.body; // Assuming you're sending the updated user data in the request body
        const user = await User.findByIdAndUpdate(id, { name, email, mobile }, { new: true }); // Find user by ID and update
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/showuser'); // Redirect to the user list page after editing
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.get('/delete-user', async(req,res)=>{
    try {
        const { id } = req.query; // Assuming you're sending the user ID in the request body
        console.log(id)
        const user = await User.findByIdAndDelete(id); // Find user by ID and delete
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/showuser'); // Redirect to the user list page after deleting
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }


})

app.post("/userinput",async(req,res)=>{
    const{name,email,mobile} = req.body;
    console.log(name,email,mobile);
    const userdata = new User({
        name,email,mobile
    });
    const save =  await userdata.save();
console.log(save)
res.redirect('/')


})