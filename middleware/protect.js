// const User = require("../Model/User");
// const Recruiter = require("../Model/Recruiter");
// const jwt = require('jsonwebtoken')
// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 🔥 Try finding in User collection
//     let account = await User.findById(decoded.id).select("-password");

//     // 🔥 If not found, try Recruiter collection
//     if (!account) {
//       account = await Recruiter.findById(decoded.id).select("-password");
//     }

//     if (!account) {
//       return res.status(401).json({ message: "Account not found" });
//     }

//     req.user = account;
//     next();

//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = protect;

const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ contains roles
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
