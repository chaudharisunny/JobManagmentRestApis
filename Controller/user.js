const { createtoken } = require("../middleware/createToken")
const User = require("../Model/User")
const asyncHandler=require('../utils/asyncHandler')

exports.createUser=asyncHandler(async(req,res)=>{
   
    const{name,email,password}=req.body;

    //validate input
    if(!name||!email||!password){
        return res.status(400).json({success:false,error:"field is required"})
    }

    // check existing user
    const userExists=await User.findOne({email})
    if(userExists){
        return res.status.json(409).json({success:false,error:"user already exists"})
    }
    
     // 3️⃣ Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // 4️⃣ Send safe response only
  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });

})


exports.login=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    //validate presense
    if(!email||!password){
        return res.status(400).json({success:false,error:"email and passwor are required"})
    }

    //find user and password explictly
    const user=await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            success:false,
            error:"invalid credentials"
        })
    }

    //compare password
    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return res.status(401).json({success:false,error:"invalid credentials"})
    }

    const token=createtoken(user)

    res.status(200).json({success:true,token,})
})