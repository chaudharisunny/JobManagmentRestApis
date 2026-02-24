const express=require('express')

const { newJob, listJob, jobOne, updateJob, deleteJob, } = require('../Controller/jobs')
const { applyJob } = require('../Controller/applyJob')
const { newAdmin, adminLogin, logoutAdmin } = require('../Controller/admin/adminAuth')

const { adminOnly } = require('../middleware/authorized')
const protect = require('../middleware/protect')
const { createUser, login, uploadResume, getResume, logoutUser } = require('../Controller/user')
const { newUserValidator, newJobValidator, newRecruiterValidator } = require('../validator/authValidator')
const { validate } = require('../middleware/validate')
const upload = require('../middleware/upload')
const { newRecruiter, loginRecruiter, updateRecruiter, logoutRecruiter } = require('../Controller/recruiter')
const { recruiterOnly } = require('../middleware/createToken')
const { updateApplicationStatus, getApplicants } = require('../Controller/application')
const { adminDashboard } = require('../Controller/admin/dashboard')
const { getAllUsers } = require('../Controller/admin/allUsers')
const { applicationList } = require('../Controller/admin/applicationList')
const { getAllRecruiter } = require('../Controller/admin/recruiterList')



const routes=express.Router()

routes.get('/index',(req,res)=>{

    res.json({message:'welcome to  job managment'})
})


routes.post('/user/newuser', newUserValidator, validate, createUser)
routes.post('/user/login', login) 
routes.post('/user/logout', logoutUser)
routes.post('/user/me/resume', protect, upload.single("resume"), uploadResume)
routes.get('/user/me/resume', protect, getResume);
routes.get('/user/jobs', listJob)
routes.get('/user/job/:id', jobOne)
routes.post("/user/applyjob/:jobId",protect, applyJob )

routes.post('/admin/signup', newAdmin)
routes.post('/admin/login', adminLogin)
routes.get('/admin/dashboard', protect, adminOnly, adminDashboard) 
routes.get('/admin/users', protect, adminOnly, getAllUsers)
routes.get('/admin/recruiters', protect, adminOnly, getAllRecruiter)
routes.get('/admin/applications', protect, adminOnly, applicationList)
routes.post('/admin/logout', logoutAdmin)

routes.post('/recruiter/new', newRecruiterValidator, validate, newRecruiter)
routes.post('/recruiter/login', loginRecruiter)
routes.post('/recruiter/logout', logoutRecruiter)
routes.put('/recruiter/profile/:id', protect,  updateRecruiter)
routes.post('/recruiter/newjob', protect, recruiterOnly, newJobValidator, validate, newJob)
routes.put('/recruiter/updatejob/:id', protect, recruiterOnly, updateJob)
routes.delete('/recruiter/deletejob/:id', protect, recruiterOnly, deleteJob)

routes.get('/recruiter/job/:jobId/applicants', protect, recruiterOnly,  getApplicants);
routes.put("/recruiter/application/:applicationId/status", protect, recruiterOnly, updateApplicationStatus)

module.exports= routes 