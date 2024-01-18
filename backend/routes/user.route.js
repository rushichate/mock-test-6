const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password} = req.body
    try{
        const isEmailPresent = await UserModel.findOne({email})
        if(isEmailPresent){
            return res.status(200).json({message:"Email Already Present"})
        }
        const hashPassword = bcrypt.hashSync(password,4)
        const newUser = new UserModel({email,password:hashPassword})
        await newUser.save()
        res.status(200).json({message:"User Registered"})

    }catch(error){
        res.status(400).json("Error during registration",error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const isEmailValid = await UserModel.findOne({email})
        if(!isEmailValid){
            return res.status(200).json({message:"Invalid Email"})
        }
        const isPasswordValid = bcrypt.compareSync(password,isEmailValid.password)
        if(!isPasswordValid){
            return res.status(200).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({userID:isEmailValid._id},"masai",{expiresIn:"30m"})
        res.status(200).json({message:"Login Successful",token:token})

    }catch(error){
        res.status(400).json("Error during login",error)
    }
})




module.exports={
    userRouter
}