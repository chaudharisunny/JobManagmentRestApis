const express=require('express')
const { newUser, login } = require('../Controller/user')
const { newJob, listJob, jobOne, updateJob, deleteJob } = require('../Controller/jobs')
const { newAdmin, adminLogin } = require('../Controller/admin')

const { adminOnly } = require('../middleware/authorized')
const protect = require('../middleware/protect')

const routes=express.Router()

routes.get('/index',(req,res)=>{

    res.json({message:'welcome to  job managment'})
})


routes.post('/newuser',newUser)
routes.post('/login',login)
routes.post('/admin/signup',newAdmin)
routes.post('/admin',adminLogin) 
routes.post('/admin/newjob',protect,adminOnly,newJob)
routes.get('/jobs',listJob)
routes.get('/job/:id',jobOne)
routes.put('/updatejob/:id',protect,adminOnly,updateJob)
routes.delete('/deletejob/:id',deleteJob)
module.exports=routes 