const asyncHandler = require("express-async-handler");

const { createToken } = require("../middleware/createToken");
const User = require("../Model/User");

exports.authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // 2️⃣ Find user (ONLY ONE MODEL NOW ✅)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("email not found");
  }

  // 3️⃣ Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("password not found");
  }

  // 4️⃣ Ensure roles exist (safety)
  const roles = user.roles && user.roles.length > 0
    ? user.roles
    : ["user"];

  // 5️⃣ Create token
  const token = createToken(user);

  // 6️⃣ Response
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: roles,
    },
  });
});

exports.authLogout= async(req,res)=>{
  res.clearCookie("token");
    res.status(200).json({ message: "logout successfully"})
}