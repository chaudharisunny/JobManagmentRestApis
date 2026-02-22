// require("dotenv").config();
// const JWT=require('jsonwebtoken')

// const  createToken=(user)=>{
//     return JWT.sign({
//         id:user._id,
//         name:user.name,
//         email:user.email,
//         role:user.role
//     },process.env.JWT_SECRET,{expiresIn:'7d'})
                
// }

// exports.userOnly = (req, res, next) => {
//     if (req.user.role !== 'user') {
//         return res.status(403).json({ message: "User access only" })
//     }
//     next()
// }

// exports.adminOnly = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).json({ message: "Admin access only" })
//     }
//     next()
// }

// exports.recruiterOnly = (req, res, next) => {
//     if (req.user.role !== 'recruiter') {
//         return res.status(403).json({ message: "recruiter access only"})
//     }
//     next()
// }
// module.exports={ createToken }


require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const userOnly = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "User access only" });
    }
    next();
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};

const recruiterOnly = (req, res, next) => {
    if (req.user.role !== "recruiter") {
        return res.status(403).json({ message: "Recruiter access only" });
    }
    next();
};

module.exports = {
    createToken,
    userOnly,
    adminOnly,
    recruiterOnly
};