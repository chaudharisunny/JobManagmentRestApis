const Jobs = require("../Model/job")


const newJob = async (req, res) => {
  try {
   
    const { title, description, jobType, salary, location } = req.body

    if( !title|| !description || !jobType || !salary|| !location ){
        return res.status(401).json({error:"all field are required "})
    }
    const createJob = await Jobs.create({
      admin: req.user._id,     // ✅ admin reference
      title,
      description,             // ✅ correct field
      jobType,
      salary,
      location
    })
    
    return res.status(201).json({
      message: 'New job created successfully',
      data: createJob
    })
  } catch (error) {
    console.log(error)
    // console.log("REQ.USER 👉", req.user._id)

    res.status(500).json({ message: 'Server error' })
  }
}

const listJob=async(req,res)=>{
    try {
        const allJobs=await Jobs.find()
        return res.status(201).json({data:allJobs})
    } catch (error) {
        res.status(500).json({error:'server error'})
    }
}
const jobOne=async(req,res)=>{
    try {
        const{id}=req.params 
        if(!id){
            return res.status(401).json({error:"id is not found"})
        }
        const selectJob=await Jobs.findById({_id:id})
        return res.status(201).json({data:selectJob})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:'server error'})
    }
}
const updateJob=async(req,res)=>{
    try {
        const {id}=req.params 
        if(!id){
            return res.status(401).json({error:"id is not found"})
        }
        const editJob= await Jobs.findByIdAndUpdate({_id:id},req.body,{new:true})
        return res.status(201).json({data:editJob})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'})
    }
}
const deleteJob=async(req,res)=>{
    try {
        const {id}=req.params 
        if(!id){
            return res.status(401).json({error:"id is not found"})
        }
        await Jobs.findByIdAndDelete({_id:id})
        return res.status(201).json({message:'successfully delete job'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'})
    }
}
module.exports={newJob,listJob,jobOne,updateJob,deleteJob}