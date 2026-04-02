const User = require("../Model/User");
const asyncHandler = require("../utils/asyncHandler");

exports.authRegister = asyncHandler(async (req, res) => {
  const { name, email, password, role, company } = req.body;

  // ✅ Normalize email
  const emailClean = email.trim().toLowerCase();

  // ✅ Default role
  let roles = ["user"];

  // ✅ Check if admin already exists
  const adminExists = await User.findOne({ roles: "admin" });

  // 🔥 Role handling
  if (role === "recruiter") {
    roles = ["recruiter"];
  }

  if (role === "admin") {
    // ✅ Allow first admin (bootstrap)
    if (adminExists) {
      if (!req.user || !req.user.roles.includes("admin")) {
        return res.status(403).json({ message: "Not allowed" });
      }
    }
    roles = ["admin"];
  }

  // ✅ Create user
  const user = await User.create({
    name,
    email: emailClean,
    password,
    roles,
    companyName: roles.includes("recruiter")
      ? { companyName: company }
      : undefined,
  });

  res.status(201).json({
    success: true,
    message: `${roles[0]} registered`,
    data: user,
  });
});
