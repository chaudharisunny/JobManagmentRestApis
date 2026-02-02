const express=require('express')

const { newJob, listJob, jobOne, updateJob, deleteJob } = require('../Controller/jobs')
const { newAdmin, adminLogin } = require('../Controller/admin')

const { adminOnly } = require('../middleware/authorized')
const protect = require('../middleware/protect')
const { createUser, login } = require('../Controller/user')
const { newUserValidator, newJobValidator } = require('../validator/authValidator')
const { validate } = require('../middleware/validate')


const routes=express.Router()

routes.get('/index',(req,res)=>{

    res.json({message:'welcome to  job managment'})
})


routes.post('/newuser',newUserValidator,validate,createUser)
routes.post('/login',login)
routes.post('/admin/signup',newAdmin)
routes.post('/admin',adminLogin) 
routes.post('/admin/newjob',protect,adminOnly,newJobValidator,validate,newJob)
routes.get('/jobs',listJob)
routes.get('/job/:id',jobOne)
routes.put('/updatejob/:id',protect,adminOnly,updateJob)
routes.delete('/deletejob/:id',deleteJob)
module.exports=routes 