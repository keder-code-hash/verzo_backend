const Drivers = require("../Models/drivers");
const Bookings = require("../Models/bookings");
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

exports.addServicesToCart = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const userId = req.body.userId;
    const service = req.body.services;

    //Search for cart whose booking is not done yet
    const booking = await Bookings.findOne({
      userId: userId,
      shopId: shopId,
      isLive: true,
    }).lean();

    // console.log(booking);
    if (booking) {
      const bookingId = booking._id.toString();
      const updatedBooking = await Bookings.findByIdAndUpdate(
        { _id: bookingId },
        { $push: { services: service } },
        { new: true }
      );
      return res.status(201).json({ status: true, data: updatedBooking });
    } else {
      let newBooking = new Bookings({
        shopId: shopId,
        userId: userId,
        services: service,
      });
      newBooking = await newBooking.save();
      return res.status(201).json({ status: true, data: newBooking });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

exports.removeServicesFromCart = async (req, res) => {
  try {
    const serviceId = req.body.serviceId;
    const bookingId = req.body.bookingId;

    const updatedBooking = await Bookings.findByIdAndUpdate(
      { _id: bookingId },
      { $pull: { services: { subServiceId: serviceId } } },
      { new: true }
    );
    return res.status(200).json({ status: true, data: updatedBooking });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const booking = await Bookings.findOne({
      userId: userId,
      isLive: true,
    })
      .populate({
        path: "services",
        populate: {
          path: "subServiceId",
        },
      })
      .populate({
        path: "services",
        populate: {
          path: "subServiceOptions",
        },
      });
    return res.status(200).json({ status: true, data: booking });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

exports.updateUserCart = async (req, res) => {
  try {
    const bookingId = req.body.bookingId;
    const updatedCart = await Bookings.findByIdAndUpdate(
      { _id: bookingId },
      req.body,
      { new: true }
    )
      .populate({
        path: "services",
        populate: {
          path: "subServiceId",
        },
      })
      .populate({
        path: "services",
        populate: {
          path: "subServiceOptions",
        },
      });
    return res.status(200).json({ status: true, data: updatedCart });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};
