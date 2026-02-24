const User = require("../../Model/User");
const asyncHandler = require("../../utils/asyncHandler");


exports.getAllUsers = asyncHandler( async( req, res) => {
    
    const users = await User.find().select("-password")

    res.status(209).json({
        success: true,
        users 
    })
})