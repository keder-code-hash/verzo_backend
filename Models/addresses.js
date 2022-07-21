const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pinCode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  landmark: {
    type: String,
  },
  addressType: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  coordinates: {
    type: [Number],
    index: "2d",
  },
});

const Address = new mongoose.model("Address", AddressSchema);
module.exports = Address;
