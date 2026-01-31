require("dotenv").config();
const JWT=require('jsonwebtoken')

const  createtoken=(user)=>{
    return JWT.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    },process.env.JWT_SECRET,{expiresIn:'7d'})
                
}

module.exports={createtoken}