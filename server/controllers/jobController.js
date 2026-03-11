const Job = require("../models/job");

exports.createJob = async(req, res) =>{
    try {
        const job = await Job.create(req.body)
        res.status(201).json(job)
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getJobs = async(req, res)=>{
    console.log("getJobs hit"); 
    try{
        const jobs  = await Job.find()
        res.status(201).json(jobs)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.updateJob = async(req,res)=>{
    try{
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(job)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.deleteJob = async(req,res)=>{
    try{
        await Job.findByIdAndDelete(req.params.id)
        res.json({message: "job deleted successfully"})
    }catch(err) {
        res.status(500).json({message : err.message})

    }
};