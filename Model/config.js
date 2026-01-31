const mongoose=require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("database connect");
}).catch((error)=>{
    console.log(error);
    
})