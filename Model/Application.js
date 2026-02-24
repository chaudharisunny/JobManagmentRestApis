const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
        required: true
    },
    resume: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        enum: ["hired", "shortlisted", "rejected"],
        default: "pending"
    }
},{timestamps:true})



module.exports = mongoose.model("Application", applicationSchema); 
