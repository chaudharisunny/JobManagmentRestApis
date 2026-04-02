const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  jobType: {
  type: String,
  required: true,
  enum: ["full-time", "part-time", "contract", "internship"]
},

  category: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],

  requirements: [
    {
      type: String,
      trim: true,
    },
  ],

  responsibilities: [
    {
      type: String,
      trim: true,
    },
  ],

  skills: [
    {
      type: String,
      trim: true,
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },

  
},
{ timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;