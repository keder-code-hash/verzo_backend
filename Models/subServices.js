const mongoose = require("mongoose");

const SubServiceSchema = new mongoose.Schema({
  dryCleanShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryCleanShop",
  },
  name: {
    type: String,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  price: {
    type: Number,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubServiceOption",
    },
  ],
});

const SubService = new mongoose.model("SubService", SubServiceSchema);
module.exports = SubService;
