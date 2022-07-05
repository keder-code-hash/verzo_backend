const mongoose = require("mongoose");

const SubServiceOptionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const SubServiceOption = new mongoose.model(
  "SubServiceOption",
  SubServiceOptionSchema
);
module.exports = SubServiceOption;
