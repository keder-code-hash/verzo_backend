const Drivers = require("../Models/drivers");
const { getAllAvailableTimeSlots } = require("../Utils/bookings");

exports.getAvailableTimeSlot = async (req, res) => {
  try {
    const pickUpDate = req.body.pickUpDate;
    const availableTimings = await getAllAvailableTimeSlots();
    return res.status(200).json({ status: true, data: availableTimings });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};
