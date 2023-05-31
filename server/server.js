const mongoose = require("mongoose");

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();


//midlewares 

app.use(express.json());

app.use(cors());


// mongo connection....
const connectionUrl = 'mongodb+srv://harshalg:jIUmTYRS86P0aD08@app.wen0ngb.mongodb.net/harshal';
mongoose.connect(connectionUrl).then(()=>{
    app.listen(7003,(err)=>{

        if(!err)  console.log("server is running....and mongodb connected....")
    })
})

//create schema
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
      },
    password:{
        type: String,
      }
})

const userModel = mongoose.model("users",userSchema)

app.get('/',(req,res)=>{
    res.send('welcome to my server.... ')
})

app.post("/login",(request , response)=>{
    
})

app.post('/signup',async(request ,response)=>{
    const {userName ,password} = request.body;
   const user = await userModel.find({userName});
   if(user.length){
    response.status(400).send("user exit")
   }else{
    let salt = 10;
    const hashingPassword = await bcrypt.hash(password ,salt);
    const newUser = await userModel.create({userName  , password : hashingPassword});
    response.status(200).send("new user created.....")
   }
})