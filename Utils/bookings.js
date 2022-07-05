const Drivers = require("../Models/drivers");
const Bookings = require("../Models/bookings");
const Shops = require("../Models/shops");
const moment = require("moment");

async function getAllAvailableTimeSlots(date, loc, shopId) {
  try {
    //Get Shop Opening And Closing Time
    // const ShopTimings = await Shops.findById({ _id: shopId }).select("timings");
    const day = moment(date).format("dddd").toUpperCase();
    let openTime = "10:00",
      closeTime = "23:00";
    // ShopTimings?.forEach((shopTime) => {
    //   if (shopTime.day === day) {
    //     openTime = shopTime.openTime;
    //     closeTime = shopTime.closeTime;
    //   }
    // });

    const timings = [];
    while (moment(openTime, "HH:mm").isBefore(moment(closeTime, "HH:mm"))) {
      timings.push(openTime);
      openTime = moment(openTime, "HH:mm").add(1, "hours").format("HH:mm");
    }

    console.log(timings);

    //Get All Available Drivers from the given loc
    // const allAvailableDrivers = await Drivers.find({
    //   loc: { $near: loc, $maxDistance: 5000 },
    // });

    // //Get AllBookings of the Day
    // const allBookings = await Bookings.findById({
    //   shopId: shopId,
    //   bookingDate: date,
    // });
    return timings;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getAllAvailableTimeSlots };
