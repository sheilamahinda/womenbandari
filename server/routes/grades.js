const { Router } = require("express");

const controlUploadGrade = require("../controller/grades/uploadGrade");
const controlUpdateGrade = require("../controller/grades/updateGrade");
const controlGetGrades = require("../controller/grades/getGrades");
const controlDeleteGrade = require("../controller/grades/deleteGrade");
const getStudentGrade = require("../controller/grades/getStudentGrade");

const router = Router();

//controller logic

router.post("/uploadGrades", controlUploadGrade);
router.get("/getGrades", controlGetGrades);
router.delete("/grades/:id", controlDeleteGrade);
router.post("/updateGrade", controlUpdateGrade);
router.get("/getGrade/:id", getStudentGrade);

// router.delete("/grades", controlDeleteProject);
// router.post("/deleteProfile", controlDeleteProject);

const gradesRoute = router;

module.exports = gradesRoute;
