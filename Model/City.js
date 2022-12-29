const mongoose = require("mongoose");

const City = new mongoose.Schema({
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
    },
    countryName: {
        type: String,
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
    },
    stateName: {
        type: String,
    },
    cityName: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("City", City);;
