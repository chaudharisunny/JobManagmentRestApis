const Application = require("../Model/Application")
const Jobs = require("../Model/Job");
const Recruiter = require("../Model/Recruiter");
const User = require("../Model/User");
const asyncHandler = require("../utils/asyncHandler");

exports.applyJob = asyncHandler(async (req, res) => {
    
    const { jobId } = req.params;
  
    const job = await Jobs.findById(jobId);
    if(!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });   
    }

    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    if(!user.resume || !user.resume.url) {
        return res.status(400).json({
            success: false,
            message: "Upload resume before applying"
        });
    }

    const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: req.user.id,
      
    });
    
    if (alreadyApplied) {
        return res.status(400).json({
            success: false,
            message: "You already applied for this job"
        });
    }
    

    const application = await Application.create({
        job: jobId,
        applicant: req.user.id,
        resume: user.resume.url,
        recruiter: job.createdBy 
    });

    res.status(201).json({
        success: true,
        message: "Applied successfully",
        data: application
    });


})