const { createtoken } = require("../middleware/createToken")
const User = require("../Model/User")
const asyncHandler=require("../utils/asyncHandler")

exports.newAdmin=asyncHandler(async(req,res)=>{

    const{name,email,password,role}=req.body 

    if(!name||!email||!password||!role){
        return res.status(400).json({success:false,error:"all fields are required"})
    }

    //existing user 
    const adminExist=await User.findOne({email})
    if(adminExist){
        res.status(409).json({success:true,error:"already exists admin "})
    }

    // create new admin 
    const createAdmin=await User.create({
        name,email,password,role 
    })

    // send response
    res.status(201).json({
        success:true,
        data:{
            id:createAdmin._id,
            name:createAdmin.name,
            email:createAdmin.email,
            role:createAdmin.role
        }
    })
})


exports.adminLogin=asyncHandler(async(req,res)=>{
    
    const{email,password}=req.body 
    if(!email||!password){
        return res.status(401).json({success:false,error:"all fields are required"})
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            success:false,
            error:"invalid credentials"
        })
    }

    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        res.status(401).json({success:false,error:"invalid credentials"})
    }
   
    const token= createtoken(user)
    res.status(201).json({success:true,token})
})