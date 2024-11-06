const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    admNumber: {
      type: String,
      required: true,
    },

    yr1: {
      semester1: {
        type: String,
        default: null,
      },
      semester2: {
        type: String,
        default: null,
      },
    },
    yr2: {
      semester1: {
        type: String,
        default: null,
      },
      semester2: {
        type: String,
        default: null,
      },
    },
    yr3: {
      semester1: {
        type: String,
        default: null,
      },
      semester2: {
        type: String,
        default: null,
      },
    },
    yr4: {
      semester1: {
        type: String,
        default: null,
      },
      semester2: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const gradesModel = mongoose.model("grades", gradeSchema);

module.exports = gradesModel;
