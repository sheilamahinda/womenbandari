const gradesModel = require("../../models/grades.js");

const getStudentGrade = async (req, res) => {
  const id = req.params.id;

  try {
    const grades = await gradesModel.findOne({
      admNumber: { $regex: new RegExp(`^${id}$`, "i") },
    });
    return res.status(200).send({
      success: true,
      grades,
    });
  } catch (error) {
    console.log(console.log(error.message));

    return res.status(500).send({
      success: false,
    });
  }
};
module.exports = getStudentGrade;
