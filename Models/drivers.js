const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
  },
  address: { type: String, required: true },
  currentLoc: {
    type: [Number],
    index: "2d",
  },
  isAvailable: { type: Boolean, default: true },
});

const Driver = new mongoose.model("Driver", DriverSchema);
module.exports = Driver;
