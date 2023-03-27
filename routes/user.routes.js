const express=require("express")
const {UserModel} = require("../models/users.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user= new UserModel({name,email,gender,password:hash,age,city,is_married})
            await user.save();
            res.status(200).send({"msg":"A new user is added"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                res.status(200).send({"msg":"Login Successful","token":jwt.sign({"userID":user._id},"saurabh")})
            });
        }else{
            res.status(400).send({"msg":"Login failed"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRouter}