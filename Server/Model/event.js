const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 256,
    },
    age: {
      type: String,
      trim: true,
      required: true,
      max: 256,
    },
    about: {
      type: String,
      max: 256,
    },
    count: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", eventSchema);
