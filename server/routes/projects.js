const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const controlAddProject = require("../controller/projects/add_project");
const controlGetProjects = require("../controller/projects/get_projects");
const controlAddLike = require("../controller/projects/add_like");
const verifyToken = require("../middleware/verifyToken");
const resourcesModel = require("../models/resources");
const controlAddRecording = require("../controller/projects/add_recording");
const recordingsModel = require("../models/recordings");

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter for video files
const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Not a video file!"), false);
  }
};

const uploadPdf = multer({ storage: storage1 });

const upload = multer({ storage, fileFilter: videoFilter });

const router = Router();

router.post("/addPdf", uploadPdf.single("file"), controlAddProject);

router.post("/addRecording", upload.single("file"), (req, res, next) => {
  req.savedFileName = req.file.filename;
  // Pass control to the controller
  controlAddRecording(req, res, next);
});
router.get("/getPdfs", async (req, res) => {
  try {
    const resources = await resourcesModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      resources,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Error getting resources",
      success: false,
    });
  }
});

router.get("/getRecordings", async (req, res) => {
  try {
    const recordings = await recordingsModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      recordings,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Error getting Recordings",
      success: false,
    });
  }
});

router.get("/getProjects/:id", controlGetProjects);

router.post("/addLike", controlAddLike);

const projectsRoute = router;

module.exports = projectsRoute;
