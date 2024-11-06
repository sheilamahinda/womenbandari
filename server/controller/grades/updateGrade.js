const gradesModel = require("../../models/grades.js");

const controlUpdateGrade = async (req, res) => {
  const { year, admNumber, sem1, sem2, id } = req.body;

  try {
    const updatedYr = `yr${year}`;

    const dbGrade = {
      semester1: sem1,
      semester2: sem2,
    };

    const grades = await gradesModel.findByIdAndUpdate(
      id,
      {
        admNumber,
        [updatedYr]: dbGrade,
      },
      { new: true, upsert: false }
    );

    if (!grades) {
      return res
        .status(404)
        .send({ success: false, message: "Grade not found" });
    }

    return res.status(200).send({
      success: true,
      grades,
      message: "Grades updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = controlUpdateGrade;
