//jshint esversion:6
require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const session=require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app=express();
//important
mongoose.set('useCreateIndex', true);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

//important!!!!!!!!!
app.use(session({
    secret:"Mywebsitesecret",
    resave:false,
    saveUninitialized:false
}));
//important
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology:true});

const userSchema= new mongoose.Schema({
    email:String,
    password:String
});
//important
userSchema.plugin(passportLocalMongoose);

const User= mongoose.model("User",userSchema);
//important
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",(req,res)=>{
    
})


app.post("/login",(req,res)=>{
   
})


app.listen(3000,()=>{console.log("Server started on port 3000")})