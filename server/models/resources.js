const mongoose = require("mongoose");

const resourcesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    instructor: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "PDF",
    },
    file: {
      data: Buffer,
      name: String,
      ContentType: String,
    },
  },
  { timestamps: true }
);

const resourcesModel = mongoose.model("resources", resourcesSchema);

module.exports = resourcesModel;
