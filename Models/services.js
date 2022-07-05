const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  dryCleanShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryCleanShop",
  },
  name: {
    type: String,
  },
});

const Service = new mongoose.model("Service", ServiceSchema);
module.exports = Service;
