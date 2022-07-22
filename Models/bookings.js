const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryCleanShop",
  },
  bookingDate: {
    type: String,
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
  services: [
    {
      subServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubService",
      },
      subServiceOptions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubServiceOption",
        },
      ],
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  pickUpAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  dropOffAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isLive: {
    type: Boolean,
    default: true,
  },
});

const Booking = new mongoose.model("DryCleanBooking", BookingSchema);
module.exports = Booking;
