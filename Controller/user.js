const { createtoken } = require("../middleware/createToken")
const User = require("../Model/User")


const newUser=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
       
        const user=await User.create({name,email,password, role: role || 'user' })
       return res.status(200).json({message:'new user create',data:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'server error'})
    }
}

const login=async(req,res)=>{
    try {
        const{email,password}=req.body 
        const user=await User.findOne({email:email})
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
        
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
    }
}
module.exports={newUser,login}