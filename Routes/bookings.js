const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookings");

router.post("/get-available-timeslots", bookingController.getAvailableTimeSlot);

module.exports = router;
