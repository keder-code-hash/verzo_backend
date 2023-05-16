const mongoose = require("mongoose");

const deliveryBoy = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  bookingStatus: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("DeliveryBoy", deliveryBoy);
