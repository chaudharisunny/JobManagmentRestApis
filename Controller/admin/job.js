const Job = require("../../Model/Job");
const asyncHandler = require("../../utils/asyncHandler");

exports.listjobs = asyncHandler(async (req, res) => {
  const alljobs = await Job.find().populate("createdBy");

  res.status(200).json({
    jobs: alljobs
  });
});