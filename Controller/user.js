
const User = require("../Model/User")
const asyncHandler=require('../utils/asyncHandler')
const cloudinary=require("../config/cloudinary");
const { createToken } = require("../middleware/createToken");

exports.createUser=asyncHandler(async(req,res)=>{
   
    const{name,email,password}=req.body;

    //validate input
    if(!name||!email||!password){
        return res.status(400).json({success:false,error:"field is required"})
    }

    // check existing user
    const userExists=await User.findOne({email})
    if (userExists) {
        return res.status(409).json({
            success: false,
            error: "User already exists"
        });
    }

    
    
     // 3️⃣ Create user
  const user = await User.create({
    name,
    email,
    password,
    
  });

  // 4️⃣ Send safe response only
  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });

})


// exports.login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             error: "Email and password are required"
//         });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//         return res.status(401).json({
//             success: false,
//             error: "email failed"
//         });
//     }
   
    

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//         return res.status(401).json({
//             success: false,
//             error: "password fail"
//         });
//     }
   
    

//     const token = createToken(user)

//     res.status(200).json({
//         success: true,
//         token
//     });
// });

exports.login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // 1. Validate
  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      error: "Email, password and role are required",
    });
  }

  // 2. Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid email",
    });
  }

  // 3. Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: "Invalid password",
    });
  }

  // 🔥 4. CHECK ROLE (MAIN FIX)
  if (!user.roles.includes(role)) {
    return res.status(403).json({
      success: false,
      error: `You are not registered as ${role}`,
    });
  }

  // 5. Token
  const token = createToken(user);

  res.status(200).json({
    success: true,
    token,
    role: user.roles,
  });
});

exports.getUsers = asyncHandler(async (req,res)=>{
    const allUsers = await User.find()
    res.status(201).json({success:true,
                        data:allUsers
                    })
})
exports.userProfile = asyncHandler(async (req, res)=>{

    const getProfile = await User.findById(req.user.id).select("-password")

    res.status(200).json({
        success: true,
        data: getProfile 
    })

})

exports.updateProfile = asyncHandler(async (req,res)=>{

    const{id}=req.params
    const profileUpdate = await User.findByIdAndUpdate(id,req.body,{new:true})
    
    res.status(201).json({
        success: true,
        data: profileUpdate
    })
})

exports.uploadResume = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "uploads",
                resource_type: "auto",   // ✅ IMPORTANT
                type: "upload",          // ✅ PUBLIC DELIVERY
                public_id: `resume_${req.user.id}`,
                overwrite: true
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        stream.end(req.file.buffer);
    });

    const fixedUrl = result.secure_url + "?t=" + Date.now();

    const user = await User.findById(req.user.id);

    user.resume = {
        url: fixedUrl,
        public_id: result.public_id
    };

    await user.save();

    res.status(200).json({
        success: true,
        url: fixedUrl
    });
});

exports.getResume = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "User not found"
        });
    }

    if (!user.resume) {
        return res.status(404).json({
            success: false,
            error: "No resume found"
        });
    }

    res.status(200).json({
        success: true,
        data: user.resume
    });
});


exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successfully"})
}