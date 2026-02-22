const userOnly = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: "User access only" })
    }
    next()
}

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access only" })
    }
    next()
}

const recruiterOnly = (req, res, next) => {
    if (req.user.role !== 'recruiter') {
        return res.status(403).json({ message: "recruiter access only"})
    }
    next()
}
module.exports = { userOnly, adminOnly, recruiterOnly }
