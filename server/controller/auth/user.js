const userModel = require("../../models/user");

const fetchUser = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      req.user.password = "";
      return res.status(200).send({
        success: true,
        ...req.user,
        isAuthenticated: req.isAuthenticated(),
      });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "login to access the page" });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const controlFetchUser = fetchUser;

module.exports = controlFetchUser;
