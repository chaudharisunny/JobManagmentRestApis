const { createtoken } = require("../middleware/createToken")
const User = require("../Model/User")


const newAdmin=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
       
        const createAdmin=await User.create({name,email,password,role:"admin"})
       return res.status(200).json({message:'new admin create',data:createAdmin})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'server error'})
    }
}

const adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body 
        const user=await User.findOne({email,role:'admin'})
        if(!user){
          return  res.status(401).json({error:'invalid email and password '})
        }
        const validPassword=await user.matchPassword(password)
        if(!validPassword){
            return    res.status(401).json({error:'invalid email and password '})
        }

        const token = createtoken(user);

        return res.status(200).json({
          message: "Login successful",
          token,
          email: user.email,
          role:user.role
        
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
    }
}
module.exports={newAdmin,adminLogin}