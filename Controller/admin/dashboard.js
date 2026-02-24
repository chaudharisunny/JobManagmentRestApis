const Application = require("../../Model/Application");
const Jobs = require("../../Model/Job");
const Recruiter = require("../../Model/Recruiter");
const asyncHandler = require("../../utils/asyncHandler");

exports.adminDashboard = asyncHandler( async( req, res) => {
    
    const totalUsers = await User.countDocuments()
    const totalRecruiters = await Recruiter.countDocuments()
    const totalJobs = await Jobs.countDocuments()
    const hiredCount = await Application.countDocuments({ status: "hired" })
    const rejectedCount = await Application.countDocuments({ status: "rejected" })

    res.status(200).json({ success: true,
                            stats: {
                                totalUsers,
                                totalRecruiters,
                                totalJobs,
                                hiredCount,
                                rejectedCount
                            }
    })
}) 