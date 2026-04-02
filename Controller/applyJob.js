
const Application = require("../Model/Application");
const Job = require("../Model/Job");
const User = require("../Model/User");
const asyncHandler = require("../utils/asyncHandler");

exports.applyJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    // 1️⃣ Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

    // 2️⃣ Check user
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // 3️⃣ Check if already applied
    const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: req.user.id
    });

    if (alreadyApplied) {
        return res.status(400).json({
            success: false,
            message: "You already applied for this job"
        });
    }

    let resumeUrl = null;

    // 4️⃣ If new resume uploaded
    if (req.file && req.file.path) {
        resumeUrl = req.file.path;

        // update user resume
        user.resume = {
            url: resumeUrl
        };

        await user.save();
    }

    // 5️⃣ Otherwise use existing resume
    else if (user?.resume?.url || user?.resume) {
        resumeUrl = user?.resume?.url || user?.resume;
    }

    // 6️⃣ If no resume found
    else {
        return res.status(400).json({
            success: false,
            message: "Please upload a resume before applying"
        });
    }

    // 7️⃣ Create application
    const application = await Application.create({
        job: jobId,
        applicant: req.user.id,
        resume: resumeUrl,
        recruiter: job.createdBy
    });

    res.status(201).json({
        success: true,
        message: "Applied successfully",
        data: application
    });

});
