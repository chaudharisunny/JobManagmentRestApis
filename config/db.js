const mongoose=require('mongoose')
require("dotenv").config();

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected");
        
    } catch (error) {
        console.error("mogngoDB connection failed: ",error.message);
        process.exit(1)
    }
};

module.exports=connectDB;
