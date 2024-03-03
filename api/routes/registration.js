const express = require('express');
const router = express.Router();
const authenticateuser = require('../middleware/authenticateuser');
const User = require("../models/User");
const Event = require("../models/Eventconduct");
const jwt= require("jsonwebtoken");

router.post('/register/:id',authenticateuser,async(req,res)=>{
try{
    const event = await Event.findById(req.params.id);
    const token=req.cookies.jwtoken;
    const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
    const rootuser=await User.findOne({_id:verifytoken._id});

    if(rootuser.registeredEvents.includes(event.eventName)){
        res.send("already registered")
    }
    else{
    event.registeredUsers=event.registeredUsers.concat(rootuser.username);
   // event.user_count=event.registered_users.size();
    rootuser.registeredEvents=rootuser.registeredEvents.concat(event.eventName);
    await event.save();
    await rootuser.save();
    

    res.send("thank you for registering");
    }
}catch(err){
    res.status(500).send(err);
}
})

module.exports=router;