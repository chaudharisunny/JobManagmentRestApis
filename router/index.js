// const express=require('express')

// const { newJob, listJob, jobOne, updateJob, deleteJob, getSingleJob, } = require('../Controller/jobs')
// const { applyJob } = require('../Controller/applyJob')
// const { newAdmin, adminLogin, logoutAdmin } = require('../Controller/admin/adminAuth')

// const { adminOnly } = require('../middleware/authorized')
// const protect = require('../middleware/protect')
// const { createUser, login, uploadResume, getResume, logoutUser, userProfile, updateProfile } = require('../Controller/user')
// const { newUserValidator, newJobValidator, newRecruiterValidator } = require('../validator/authValidator')
// const { validate } = require('../middleware/validate')

// const { newRecruiter, loginRecruiter, updateRecruiter, logoutRecruiter, getJobsRecruiter, getRecruiterProfile } = require('../Controller/recruiter')
// const { recruiterOnly } = require('../middleware/createToken')
// const { updateApplicationStatus, getApplicants } = require('../Controller/application')
// const { adminDashboard } = require('../Controller/admin/dashboard')
// const { getAllUsers } = require('../Controller/admin/allUsers')
// const { applicationList } = require('../Controller/admin/applicationList')
// const { getAllRecruiter } = require('../Controller/admin/recruiterList')
// const { fileUploadResume } = require('./fileUploadResume')
// const upload = require('../config/upload')
// const { listjobs } = require('../Controller/admin/job')



// const routes=express.Router()

// routes.get('/index',(req,res)=>{

//     res.json({message:'welcome to  job managment'})
// })


// routes.post('/user/newuser', newUserValidator, validate, createUser)
// routes.post('/user/login', login) 
// routes.get('/user/profile', protect, userProfile)
// routes.put('/user/updateProfile/:id',protect,updateProfile)
// routes.post('/user/logout', logoutUser)
// routes.post('/user/me/resume', protect, upload.single('resume'), fileUploadResume)
// routes.get('/user/me/resume', protect, getResume);
// routes.get('/user/jobs', listJob)
// routes.get('/user/job/:id', jobOne)
// routes.post("/user/applyjob/:jobId",protect,upload.single('resume'), applyJob )
// routes.get('/user/joblist',protect, listJob)
// routes.get('/user/alluser',protect,adminOnly,getAllUsers)

// routes.post('/admin/signup', newAdmin)
// routes.post('/admin/login', adminLogin)
// routes.get('/admin/dashboard', protect, adminOnly, adminDashboard) 
// routes.get('/admin/users', protect, adminOnly, getAllUsers)
// routes.get('/admin/recruiters', protect, adminOnly, getAllRecruiter)
// routes.get('/admin/alljobs', protect,adminOnly, listjobs)
// routes.get('/admin/applications', protect, adminOnly, applicationList)
// routes.post('/admin/logout', logoutAdmin)

// routes.get('/recruiter/postjobs',protect, recruiterOnly, getJobsRecruiter)
// routes.post('/recruiter/new', newRecruiterValidator, validate, newRecruiter)
// routes.post('/recruiter/login', loginRecruiter)
// routes.post('/recruiter/logout', logoutRecruiter)
// routes.get('/recruiter/profile/:id', protect, recruiterOnly, getRecruiterProfile)
// routes.put('/recruiter/profile/:id', protect,  updateRecruiter)

// routes.post('/recruiter/newjob', protect, recruiterOnly, newJobValidator, validate, newJob)
// routes.put('/recruiter/updatejob/:id', protect, recruiterOnly, updateJob)
// routes.delete('/recruiter/deletejob/:id', protect, recruiterOnly, deleteJob)

// routes.get('/recruiter/applicants/:id', protect, recruiterOnly,  getApplicants);
// routes.put("/recruiter/application/:applicationId/status", protect, recruiterOnly, updateApplicationStatus)
// routes.get("/recruiter/job/:id",protect, recruiterOnly, getSingleJob)
// module.exports= routes 


const express=require('express')

const { newJob, listJob, jobOne, updateJob, deleteJob, getSingleJob, appliedList, } = require('../Controller/Job')
const { applyJob } = require('../Controller/applyJob')
const { newAdmin, adminLogin, logoutAdmin } = require('../Controller/admin/adminAuth')

const { adminOnly } = require('../middleware/authorized')
const protect = require('../middleware/protect')
const { createUser, login, uploadResume, getResume, logoutUser, userProfile, updateProfile } = require('../Controller/user')
const { newUserValidator, newJobValidator, newRecruiterValidator } = require('../validator/authValidator')
const { validate } = require('../middleware/validate')

const { newRecruiter, loginRecruiter, updateRecruiter, logoutRecruiter, getJobsRecruiter, getRecruiterProfile } = require('../Controller/recruiter')
const { recruiterOnly } = require('../middleware/createToken')
const { updateApplicationStatus, getApplicants } = require('../Controller/application')
const { adminDashboard } = require('../Controller/admin/dashboard')
const { getAllUsers } = require('../Controller/admin/allUsers')
const { applicationList } = require('../Controller/admin/applicationList')
const { getAllRecruiter } = require('../Controller/admin/recruiterList')
const { fileUploadResume } = require('./fileUploadResume')
const upload = require('../config/upload')
const { listjobs } = require('../Controller/admin/job')
const authorizeRoles = require('../middleware/authorizedRoles')
const { authLogin, authLogout } = require('../Auth/login')
const { authRegister } = require('../Auth/register')



const routes=express.Router()

routes.get('/index',(req,res)=>{

    res.json({message:'welcome to  job managment'})
})


// routes.post('/user/newuser', newUserValidator, validate, createUser)
// routes.post('/user/login', login) 
routes.post('/auth/register', authRegister)
routes.post('/auth/login', authLogin)
routes.post('/auth/logout', authLogout)


// routes.post('/user/logout', logoutUser)
routes.get('/user/profile', protect, userProfile)
routes.put('/user/updateProfile/:id',protect,updateProfile)
routes.post('/user/me/resume', protect, upload.single('resume'), fileUploadResume)
routes.get('/user/me/resume', protect, getResume);
routes.get('/user/jobs', listJob)
routes.get('/user/job/:id', jobOne)
routes.post("/user/applyjob/:jobId",protect,upload.single('resume'), applyJob )
routes.get('/user/joblist',protect, listJob)
routes.get('/user/appliedlist', protect, appliedList)
routes.get('/user/alluser',protect,authorizeRoles("admin"),getAllUsers)

// routes.post('/admin/signup', newAdmin)
// routes.post('/admin/login', adminLogin)
// routes.post('/admin/logout', logoutAdmin)
routes.get('/admin/dashboard', protect, authorizeRoles("admin"), adminDashboard) 
routes.get('/admin/users', protect, authorizeRoles("admin"), getAllUsers)
routes.get('/admin/recruiters', protect, authorizeRoles("admin"), getAllRecruiter)
routes.get('/admin/alljobs', protect,authorizeRoles("admin"), listjobs)
routes.get('/admin/applications', protect, authorizeRoles("admin"), applicationList)


// routes.post('/recruiter/new', newRecruiterValidator, validate, newRecruiter)
// routes.post('/recruiter/login', loginRecruiter)
// routes.post('/recruiter/logout', logoutRecruiter)
routes.get('/recruiter/postjobs',protect, authorizeRoles("recruiter"), getJobsRecruiter)
routes.get('/recruiter/profile/:id', protect, authorizeRoles("recruiter"), getRecruiterProfile)
routes.put('/recruiter/profile/:id', protect,  updateRecruiter)

routes.post('/recruiter/newjob', protect, authorizeRoles("recruiter"), newJobValidator, validate, newJob)
routes.put('/recruiter/updatejob/:id', protect, authorizeRoles("recruiter"), updateJob)
routes.delete('/recruiter/deletejob/:id', protect, authorizeRoles("recruiter"), deleteJob)

routes.get('/recruiter/applicants/:id', protect, authorizeRoles("recruiter"),  getApplicants);
routes.put("/recruiter/application/:applicationId/status", protect, authorizeRoles("recruiter"), updateApplicationStatus)
routes.get("/recruiter/job/:id",protect, authorizeRoles("recruiter"), getSingleJob)
module.exports= routes 