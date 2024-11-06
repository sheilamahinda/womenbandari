const mongoose = require("mongoose");
const gradesModel = require("../../models/grades.js");

const controlDeleteGrade = async (req, res) => {
  const id = req.params.id;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid ID format" });
  }

  try {
    const deletedGrade = await gradesModel.findOneAndDelete({ _id: id });
    if (!deletedGrade) {
      return res
        .status(404)
        .send({ success: false, message: "Grade not found" });
    }
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = controlDeleteGrade;
