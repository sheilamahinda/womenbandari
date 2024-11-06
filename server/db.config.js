const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = (cb) => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/skipper")
    .then(() => {
      return cb();
    })
    .catch((err) => {
      {
        console.log(err.message);
      }
    });
};

module.exports = dbConnection;
