// const mongoose=require('mongoose')
// const bcrypt=require('bcrypt')

// const resumeSchema= new mongoose.Schema({
//     url:String,
//     public_id:String,
//     uploadedAt:{
//         type:Date,
//         default:Date.now
//     }
// })
// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         require:true,
//         trim:true 
//     },
//     email:{
//         type:String,
//         unique:true,
//         require:true,
//         lowercase:true 
//     },
//     password:{
//         type:String,
//         require:true,
//         minlength:6,
//         select:false  
//     },
//     role:{
//         type:String,
//         enum:["user","admin","recruiter"],
//         default:"user"
//     },
//     resume:resumeSchema
// },{timestamps:true})

// userSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
  
//   userSchema.methods.matchPassword = async function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password);
//   };
//  const User=mongoose.model('User',userSchema)
//  module.exports=User


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// 📄 Resume Schema (for users)
const resumeSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// 🏢 Company Schema (for recruiters)
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  website: String,
  location: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // 🔥 MULTI ROLE SYSTEM
    roles: {
      type: [String],
      enum: ["user", "recruiter", "admin"],
      default: ["user"],
    },

    // 👤 USER FEATURES
    resume: resumeSchema,

    // 🏢 RECRUITER FEATURES
    company: companySchema,

    // 📌 Optional
    phone: String,
    profilePic: String,
  },
  { timestamps: true }
);

// 🔐 Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;