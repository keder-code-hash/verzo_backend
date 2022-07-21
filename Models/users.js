const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    phone: {
      countryCode: {
        type: Number,
      },
      number: {
        type: Number,
      },
    },
    mail: {
      type: String,
    },
  },
  addressIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  userToken: {
    type: String,
  },
  uid: {
    type: String,
  },
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
