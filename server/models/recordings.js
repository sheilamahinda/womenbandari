const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      name: String,
      mimetype: String,
      filename: String,
    },
    type: {
      type: String,
      required: true,
      default: "recordings",
    },
  },
  { timestamps: true }
);

const recordingsModel = mongoose.model("recordings", recordingSchema);

module.exports = recordingsModel;
