const Application = require("../../Model/Application");
const Jobs = require("../../Model/Job");
const Recruiter = require("../../Model/Recruiter");
const User = require("../../Model/User");
const asyncHandler = require("../../utils/asyncHandler");

exports.adminDashboard = asyncHandler(async (req, res) => {
  // 📊 Stats
  const totalUsers = await User.countDocuments();
  const totalRecruiters = await Recruiter.countDocuments();
  const totalJobs = await Jobs.countDocuments();
  const totalApplications = await Application.countDocuments();

  const hiredCount = await Application.countDocuments({ status: "hired" });
  const rejectedCount = await Application.countDocuments({ status: "rejected" });

  const activeJobs = await Jobs.countDocuments({
    status: { $regex: /^active$/i },
  });

  // 🏢 Top Recruiters
  const topRecruiters = await Recruiter.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("companyName email");

  // 💼 Active Jobs
  const activeJobsList = await Jobs.find({
    status: { $regex: /^active$/i },
  })
    .populate("recruiter", "companyName")
    .limit(5);

  // 🔥 Most Applied Jobs
  const mostAppliedJobs = await Application.aggregate([
    {
      $group: {
        _id: "$job",
        totalApplications: { $sum: 1 },
      },
    },
    { $sort: { totalApplications: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "jobs",
        localField: "_id",
        foreignField: "_id",
        as: "jobDetails",
      },
    },
    {
      $unwind: {
        path: "$jobDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  // 🧪 DEBUG (remove later)
  console.log("Top Recruiters:", topRecruiters);
  console.log("Active Jobs:", activeJobsList);
  console.log("Most Applied Jobs:", mostAppliedJobs);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalApplications,
      hiredCount,
      rejectedCount,
      activeJobs,
    },
    lists: {
      topRecruiters,
      activeJobsList,
      mostAppliedJobs,
    },
  });
});