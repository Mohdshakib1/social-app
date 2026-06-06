const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signup",async(req,res)=>{

    try{

        const {username,email,password}=req.body;

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User exists"
            });
        }

        const hashedPassword=
        await bcrypt.hash(password,10);

        const user=await User.create({
            username,
            email,
            password:hashedPassword
        });

        res.json(user);

    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/login",async(req,res)=>{

    try{

        const {email,password}=req.body;

        const user=
        await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        const valid=
        await bcrypt.compare(
            password,
            user.password
        );

        if(!valid){
            return res.status(400).json({
                message:"Wrong password"
            });
        }

        const token=jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET
        );

        res.json({
            token,
            user
        });

    }catch(error){
        res.status(500).json(error);
    }
});

module.exports=router;