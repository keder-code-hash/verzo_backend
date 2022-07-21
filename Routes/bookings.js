const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookings");

router.post("/get-available-timeslots", bookingController.getAvailableTimeSlot);
router.post("/add-services-to-cart", bookingController.addServicesToCart);
router.get("/get-user-cart/:userId", bookingController.getUserCart);
router.patch("/update-user-cart", bookingController.updateUserCart);
module.exports = router;
