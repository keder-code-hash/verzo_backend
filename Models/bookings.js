const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryCleanShop",
  },
  bookingDate: {
    type: String,
    required: true,
  },
  pickUpDate: {
    type: Date,
  },
  deliveryDate: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isDriverAlloted: {
    type: Boolean,
    default: false,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

const Booking = new mongoose.model("Booking", BookingSchema);
module.exports = Booking;
