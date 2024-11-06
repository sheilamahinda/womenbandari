const recordingsModel = require("../../models/recordings");

const controlAddRecording = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    console.log(file);

    if (!file) {
      return res.status(400).json({ message: "No video file uploaded!" });
    }

    // Save video metadata and file path to MongoDB
    const newRecording = new recordingsModel({
      title,
      file: {
        filename: req.savedFileName,
        data: file.path, // or store the URL if using cloud storage
        name: file.originalname,
        mimetype: file.mimetype,
      },
    });

    await newRecording.save();
    const recordings = await recordingsModel.find({}).sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully!",
      recordings,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to upload video." });
  }
};

module.exports = controlAddRecording;
