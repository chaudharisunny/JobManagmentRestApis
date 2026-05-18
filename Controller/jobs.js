
const Application = require("../Model/Application")
const Job= require("../Model/Job")

const asyncHandler=require("../utils/asyncHandler")

exports.newJob=asyncHandler(async(req,res)=>{

    if(!req.user){
        return res.status(401).json({error:"unauthorized"})
    }
    const{title,description,salary,jobType,location,category,requirements,responsibilities,skills}=req.body 

    if(!title||!description||!salary||!jobType||!location||!requirements||!responsibilities||!category||!skills){
        return res.status(409).json({success:true,error:"all field are required"})
    }

    const createJob= await Job.create({
        title,description,salary,jobType,location,category,requirements,responsibilities,skills,createdBy: req.user._id 
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

    const allJobs = await Job.find(query)
        .populate("createdBy", "company")
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
    
    const selectJob=await Job.findById(id)
     .populate("createdBy", "company name");

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
  
    const job = await Job.findByIdAndUpdate(
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

// exports.appliedList = asyncHandler(async( req, res)=>{

    
//     const userJobList = await Application.find({ applicant: req.user.id})
//     .populate("job").populate("recruiter", "company name")
   
//     return res.status(201).json({
//         success:true,
//         data:userJobList
//     })
// })  

exports.appliedList = asyncHandler(async (req, res) => {

    const userJobList = await Application.find({
        applicant: req.user.id
    })
    .populate({
        path: "job",
        select: "title location salary jobType"
    })
    .populate({
        path: "recruiter",
        select: "company name"
    });
console.log("REQ USER ID:", req.user.id);
    return res.status(200).json({
        success: true,
        data: userJobList
    });

});

exports.deleteJob=asyncHandler(async(req,res)=>{
    const {id}=req.params 
    
    const deleteJob=await Job.findByIdAndDelete(id)
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


exports.getSingleJob = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.status(200).json({
    success: true,
    job
  });

});

