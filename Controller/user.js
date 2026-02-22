
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


exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Email and password are required"
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({
            success: false,
            error: "Invalid credentials"
        });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            error: "Invalid credentials"
        });
    }

    const token = createToken(user)

    res.status(200).json({
        success: true,
        token
    });
});



exports.uploadResume = asyncHandler(async (req, res) => {

    console.log("STEP 1 - file received");

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    console.log("STEP 2 - starting cloudinary upload");

    const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "uploads",
                resource_type: "raw",
                public_id: `resume_${req.user.id}.pdf`, // force pdf
                overwrite: true  // ✅ correct place
            },
            (error, result) => {

                if (error) {
                    console.log("Cloudinary error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(req.file.buffer);
    });

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    user.resume = {
        url: result.secure_url,
        public_id: result.public_id
    };

    await user.save();

    console.log("STEP 4 - upload finished");

    const pdfUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/v${result.version}/${result.public_id}.pdf`;

    res.status(200).json({
        success: true,
        url: pdfUrl
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