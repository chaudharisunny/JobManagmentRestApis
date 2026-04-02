const asyncHandler = require("../utils/asyncHandler");


 exports.fileUploadResume = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // file path (local storage)
    const filePath = req.file.path;

    // TODO: save filePath in database (user resume field)

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      file: req.file,
      filePath: filePath,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

