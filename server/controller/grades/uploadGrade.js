const gradesModel = require("../../models/grades");

const controlUploadGrade = async (req, res) => {
  const { year, admNumber, sem1, sem2 } = req.body;

  try {
    const updatedYr = `yr${year}`;

    const dbGrade = {
      semester1: sem1,
      semester2: sem2,
    };

    const dbGradeUser = await gradesModel.findOne({
      admNumber: { $regex: new RegExp(`^${admNumber}$`, "i") },
    });

    if (!dbGradeUser) {
      const newGrade = new gradesModel({
        admNumber,
        [updatedYr]: dbGrade,
      });
      await newGrade.save();
    } else {
      dbGradeUser[updatedYr] = dbGrade;
      await dbGradeUser.save();
    }

    const grades = await gradesModel.find({}).sort({ createdAt: -1 });

    return res.status(200).send({
      message: "Grade updated successfully",
      success: true,
      grades,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlUploadGrade;
