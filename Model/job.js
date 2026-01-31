const mongoose=require('mongoose')
const jobSchema=new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true 
    },
    salary:{
        type:String,
        required:true 
    },
     description:{
        type:String,
        required:true 
    },
    location:{
        type:String,
        required:true 
    },
    jobType:{
        type:String,
        required:true 
    },
 },{timestamps:true}) 

 const Jobs=mongoose.model('Jobs',jobSchema)

 module.exports=Jobs