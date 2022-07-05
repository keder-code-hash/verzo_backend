const mongoose = require("mongoose");

const DryCleanShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
    },
    contact: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
    },
    timings: [
      {
        day: { type: String },
        openTime: { type: String },
        closeTime: { type: String },
      },
    ],
    website: {
      type: String,
    },
    loc: {
      type: [Number],
      index: "2d",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    isLive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const DryCleanShop = mongoose.model("DryCleanShop", DryCleanShopSchema);
module.exports = DryCleanShop;
