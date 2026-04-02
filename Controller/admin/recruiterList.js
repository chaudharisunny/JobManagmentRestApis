const Recruiter = require("../../Model/Recruiter");
const asyncHandler = require("../../utils/asyncHandler");


exports.getAllRecruiter = asyncHandler( async( req, res) => {
    
    const users = await Recruiter.find().select("-password")

    res.status(209).json({
        success: true,
        data:users 
    })
})