const Application = require("../Model/Application");
const Job = require("../Model/Job");
const asyncHandler = require("../utils/asyncHandler");


// GET JOB APPLICANTS
exports.getApplicants = asyncHandler(async (req, res) => {

    const jobId = req.params.id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Find applicants for this job
    const applicants = await Application.find({ job: jobId }).populate("applicant");

   return res.json({ data:applicants,
               success:true 
     });

});


// UPDATE APPLICATION STATUS
exports.updateApplicationStatus = asyncHandler(async (req, res) => {

    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["hired", "shortlisted", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found"
        });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
        success: true,
        message: `Application ${status} successfully`
    });

});