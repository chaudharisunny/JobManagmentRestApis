
const { createToken } = require("../middleware/createToken");
const Recruiter = require("../Model/Recruiter");
const asyncHandler = require("../utils/asyncHandler");


exports.newRecruiter = asyncHandler(async(req,res) => {
     
    const {name,email,password,company}=req.body;
    const createRecruiter = await Recruiter.create({name,email,password,company})
    return res.status(201).json({ message: "new recruiter create an account", data: createRecruiter})
})

exports.loginRecruiter = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const recruiter = await Recruiter
        .findOne({ email })
        .select("+password"); // 🔥 VERY IMPORTANT

    if (!recruiter) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await recruiter.matchPassword(password);

    if (!validPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(recruiter)

    res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });

});

exports.updateRecruiter = asyncHandler(async (req, res) => {
    
    const {id} = req.params ;

    if(!id) {
        return res.status(404).json({ error: "id is not found"})
    }
    const updateProfile = await Recruiter.findByIdAndUpdate( id, req.body, {new:true})
    return res.status(200).json({ message: "update successfully", data: updateProfile})
}) 


exports.deleteRecruiter = asyncHandler(async (req, res) => {
    
    if(!id) {
        return res.status(404).json({ error: "id is not found"})
    }
    const deleteAccount = await Recruiter.findByIdAndDelete(id)
    return res.status(200).json({ message: "deleted account", data:deleteAccount})
})


exports.logoutRecruiter = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successfully"})
}