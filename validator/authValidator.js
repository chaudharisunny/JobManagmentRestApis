const { body } = require("express-validator")

exports.newUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

]

exports.newJobValidator=[
    body("titile")
    .notEmpty()
    .withMessage("title is required"),

    body("description")
    .notEmpty()
    .withMessage("description is required"),

    body("salary")
    .notEmpty()
    .withMessage("salary is required")
    .isNumeric()
    .withMessage("salary must be Numeric"),

    body("location")
    .notEmpty()
    .withMessage("location is required"),

    body("JobType")
    .notEmpty()
    .withMessage("jobType is required")
    .isIn(["part-time","full-time","remote"])
    .withMessage("Invalid job type"),
]

