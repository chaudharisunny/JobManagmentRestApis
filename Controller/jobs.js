const Jobs = require("../Model/Job")
const asyncHandler=require("../utils/asyncHandler")

exports.newJob=asyncHandler(async(req,res)=>{

    if(!req.user){
        return res.status(401).json({error:"unauthorized"})
    }
    const{title,description,salary,jobType,location,category,skills}=req.body 

    if(!title||!description||!salary||!jobType||!location||!category||!skills){
        return res.status(409).json({success:false,error:"all field are required"})
    }

    const createJob= await Jobs.create({
        title,description,salary,jobType,location,category,skills,createdBy: req.user._id 
    })

   return res.status(200).json({success:true,data:createJob})
    
})

 exports.listJob = asyncHandler(async (req, res) => {
    const { search, category, skills, cursor, limit = 10 } = req.query;

    let query = {};

    // 🔍 Search
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    // 🎯 Category Filter
    if (category) {
        query.category = category;
    }

    // 🛠 Skill Filter
    if (skills) {
        const skillsArray = skills.split(",");
        query.skills = { $in: skillsArray };
    }


    // 🔁 Infinite Scroll Cursor
    if (cursor) {
        query._id = { $lt: cursor };
    }

    const allJobs = await Jobs.find(query)
        .sort({ _id: -1 })
        .limit(Number(limit));

    res.status(200).json({
        success: true,
        count: allJobs.length,
        data: allJobs,
        nextCursor: allJobs.length 
            ? allJobs[allJobs.length - 1]._id 
            : null
    });
});

 exports.jobOne=asyncHandler(async(req,res)=>{
   
    const{id}=req.params 
    
    const selectJob=await Jobs.findById(id)
    if(!selectJob){
        return res.status(404).json({
            success:false,
            message:"job not found"
        })
    }
    res.status(200).json({success:true,data:selectJob})
})

exports.updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params
  
    const job = await Jobs.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
  
    // Case 1: Job ID is valid but record does NOT exist
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }
  
    // Case 2: Job updated successfully
    res.status(200).json({
      success: true,
      data: job
    })
  })
  
exports.deleteJob=asyncHandler(async(req,res)=>{
    const {id}=req.params 
    
    const deleteJob=await Jobs.findByIdAndDelete(id)
    if(!deleteJob){
       return res.status(404).json(
        {
            success:false,
            error:"job not found"
        })
    }
    res.status(200).json(
        {
            success:true,
            message:"job deleted successfully"
        })
})

