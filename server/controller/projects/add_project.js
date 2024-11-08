const fs = require("fs");
const path = require("path");
const resourcesModel = require("../../models/resources.js");

const controlAddProject = async (req, res) => {
  try {
    const uploadedFile = {
      data: fs.readFileSync(
        path.join(__dirname, "../../public/uploads", req.file.filename)
      ),
      name: req.file.filename,
      contentType: req.file.mimetype,
    };

    const newProject = new resourcesModel({
      title: req.body.title,
      subtitle: req.body.subtitle,
      instructor: req.body.instructor,
      file: uploadedFile,
    });

    await newProject.save();

    const resources = await resourcesModel.find({});

    return res.status(200).json({
      message: "Project uploaded successfully",
      success: true,
      resources,
    });
  } catch (error) {
    console.error("Error while uploading project:", error.message);
    return res.status(500).json({
      message: "Error uploading project",
      success: false,
    });
  }
};

module.exports = controlAddProject;
