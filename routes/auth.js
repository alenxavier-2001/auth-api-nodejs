const User = require('../models/user');
const auth = require("../middlewares/auth");

const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Signup api
router.post('/signup',async (req,res)=>{
  try{ 
  const email = req.body.email;
   
    const existinguser = await  User.findOne({email});
    if(existinguser){
      return res.status(400).json({msg:'User with same email already exists'});
    }
  
 let hashedPassword =await bcryptjs.hash(req.body.password,8);
 
    let user = new User({
      username:req.body.username,
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword,
    })
    user = await user.save();
    res.json(user);

  }catch(e){
    console.log(e.message);
    res.status(500).json({error:e.message});
  }
});


//SignIn api
router.post('/signin',async (req,res)=>{
  try{ 

    const {email,password} =req.body;
  
   
    const user = await  User.findOne({email});
    if(!user){
      return res.status(400).json({msg:'User with this email doesnot exists'});
    }
  
 const isMatch =await bcryptjs.compare(password,user.password);
 if(!isMatch){
  return res.status(400).json({msg:'Inncorrect password'});
 }
 let id = user._id;
  const token = jwt.sign({id},"passwordKey"); 
res.json({token, ...user._doc});
  }catch(e){
    console.log(e.message);
    res.status(500).json({error:e.message});
  }
});

//Get User data api
router.post('/tokenIsValid',async (req,res)=>{
  try{ 

    
  
  const token = req.header('x-auth-token');
  if(!token){
    return res.json(false);
  }
 const verified = jwt.verify(token,"passwordKey");
 if(!verified) return res.json(false);

 const user = await User.findById(verified.id );
 if(!user) return res.json(false);
 res.json(true);
  }catch(e){
    console.log(e.message);
    res.status(500).json({error:e.message});
  }
});


// get user data
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});


module.exports = router;