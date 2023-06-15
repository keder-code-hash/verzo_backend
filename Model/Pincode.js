const mongoose = require("mongoose");

const Pincode = new mongoose.Schema({
    state_name: {
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Pincode", Pincode);
