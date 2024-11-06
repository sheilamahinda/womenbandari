const gradesModel = require("../../models/grades");

const controlGetGrades = async (req, res) => {
  try {
    const grades = await gradesModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({ grades });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = controlGetGrades;
