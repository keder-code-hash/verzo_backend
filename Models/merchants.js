const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  contact: {
    phone: {
      type: String,
    },
    email: {
      type: email,
    },
  },
  dryCleanShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryCleanShop",
  },
});

const Merchant = new mongoose.Model("Merchant", MerchantSchema);
module.exports = Merchant;
