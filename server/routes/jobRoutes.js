const router = require("express").Router();
const { createJob, getJobs, updateJob , deleteJob} = require("../controllers/jobController")
const auth = require("../middleware/authMiddleware");

router.post("/",auth, createJob);
router.get("/",auth,getJobs);
router.put("/:id",auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports= router;