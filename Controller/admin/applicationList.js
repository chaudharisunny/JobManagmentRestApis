const Application = require("../../Model/Application");
const asyncHandler = require("../../utils/asyncHandler");


exports.applicationList =  asyncHandler( async( req, res ) => {

    const listApplication = await Application.find()
    .populate( "job", "title" )
    .populate( "applicant", "name email")
    .populate( "recruiter", "name email")

    res.status(200).json({
        success: true,
        listApplication 
    })
})