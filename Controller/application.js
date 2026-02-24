const Application = require("../Model/Application");
const asyncHandler = require("../utils/asyncHandler");


exports.getApplicants = asyncHandler( async ( req, res) => {
    const { jobId } = req.params 

    const applications = await Application.find( { job: jobId })
    .populate("applicant", "name email resume")

    res.status(200).json({ success: true,
        applications
    })
})

exports.updateApplicationStatus = asyncHandler(async (req, res) => {

    const {applicationId } = req.params 
    const { status } = req.body 

    if ( !["hired", "shortlisted", "rejected"].includes(status) ) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        })
    }

    const application = await Application.findById(applicationId)

    if(!application) {
        return res.status(404).json({
             success: false,
            message: "Application not found"
        })
    }

    application.status = status
    await application.save()

    res.status(200).json({
        success: true,
        message: `Application ${status} successfully`
    })
})