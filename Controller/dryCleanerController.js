const DryCleaning = require("../Model/Drycleaning");
const Auth = require("../Model/Auth");
const dryCleanerBooking = require("../Model/dryCleanerBooking");
const Order = require("../Model/Order");

exports.dryCleanerData = async (req, res) => {
  let model = await DryCleaning.findOne({ userId: req.data.id });
  if (!model) model = await DryCleaning.create({ userId: req.data.id });
  return res.status(200).json({ success: true, msg: "list", data: model });
};

exports.updateDryCleanerProfile = async (req, res) => {
  const User = await Auth.findById(req.data.id);
  let model = await DryCleaning.findOne({ userId: req.data.id });
  if (!model) model = await DryCleaning.create({ userId: req.data.id });
  if (req.body.availability) model.availability = req.body.availability;
  if (req.body.acceptItems) model.acceptItems = req.body.acceptItems;
  if (req.body.images) model.images = req.body.images;
  if (req.body.about) model.about = req.body.about;
  model.merchantName = User.firstName + " " + User.lastName;
  model.merchantCity = User.city || "kolkata";
  model.status = "active";
  await model.save();
  if (!User.isDryCleaner) {
    User.isDryCleaner = true;
    await User.save();
  }
  return res
    .status(200)
    .json({ success: true, msg: "Dry cleaner profile updated successful" });
};

exports.searchDryCleaner = async (req, res) => {
  let model = await DryCleaning.find({
    userId: { $ne: req.data.id },
    merchantCity: req.query.cityName,
    status: "active",
  });
  return res.status(200).json({ success: true, msg: "list", data: model });
};

exports.myDryCleanerBooking = async (req, res) => {
  console.log("entering into dry cleaner api properly.");
  const userDetails = await Auth.findById(req.data.id);
  const dryCleanerDetails = await DryCleaning.findOne({
    userId: req.body.dryCleanerId,
  });
  if (!userDetails || !dryCleanerDetails)
    return res
      .status(200)
      .json({ success: false, msg: "Invalid dryCleanerId" });

  let model = await dryCleanerBooking.create({
    bookingBy: req.data.id,
    bookingTo: req.body.dryCleanerId,
  });
  model.bookingByUserName = userDetails.firstName + " " + userDetails.lastName;
  model.bookingToDryCleanerName = dryCleanerDetails.merchantName;
  if (req.body.bookingItems) model.bookingItems = req.body.bookingItems;
  if (req.body.totalPrice) model.totalPrice = req.body.totalPrice;
  model.paymentBy = "cash";
  model.paymentStatus = "pending";
  model.bookingStatus = "pending";
  await model.save();
  console.log("Hit this endpoint.");
  return res.status(200).json({
    success: true,
    msg: "Order placed successfully",
    dry_cleaning_booking_id: model._id,
    dry_cleaning_booking_by_id: model.bookingBy._id,
    dry_cleaning_booking_total_price: model.totalPrice,
  });
};

exports.dryCleanerOrders = async (req, res) => {
  let model = await dryCleanerBooking.find({
    bookingTo: req.data.id,
  });
  // let otp = 1;
  let bookingIds = model.map((mod) => {
    return mod.id;
  });
  let allOrderDetails = await Order.find();
  let otpMap = [];
  let zipCode = [];
  let paymentStatus = [];
  allOrderDetails.map((order) => {
    if (bookingIds.indexOf(order.bookingId) !== -1) {
      otpMap.push({
        bookingId: order.bookingId,
        otp: order.otp,
      });
      zipCode.push({
        bookingId: order.bookingId,
        zipCode: order.zipCode || "default",
      });
      paymentStatus.push({
        bookingId: order.bookingId,
        paymentStatus: order.status,
      });
    }
  });
  const result = {
    model: model,
    otpMap: otpMap,
    zipCodeMap: zipCode,
    paymentStatus: paymentStatus,
  };
  console.log(result);
  return res.status(200).json({ success: true, msg: "list", data: result });
};

exports.usersOrders = async (req, res) => {
  let model = await dryCleanerBooking.find({
    bookingBy: req.data.id,
  });
  // let otp = 1;
  let bookingIds = model.map((mod) => {
    return mod.id;
  });
  let allOrderDetails = await Order.find();
  let otpMap = [];
  allOrderDetails.map((order) => {
    if (bookingIds.indexOf(order.bookingId) !== -1) {
      otpMap.push({
        bookingId: order.bookingId,
        otp: order.otp,
      });
    }
  });
  const result = {
    model: model,
    otpMap: otpMap,
  };
  console.log(result);
  return res.status(200).json({ success: true, msg: "list", data: result });
};

exports.cancelDryCleaningOrder = async (req, res) => {
  let model = await dryCleanerBooking.findOne({ _id: req.body.orderId });
  if (!model)
    return res.status(200).json({ success: false, msg: "Invalid order id" });
  model.bookingStatus = "cancelled";
  await model.save();
  return res.status(200).json({ success: true, msg: "cancelled" });
};

exports.acceptDryCleaningOrder = async (req, res) => {
  let model = await dryCleanerBooking.findOne({ _id: req.body.orderId });
  if (!model)
    return res.status(200).json({ success: false, msg: "Invalid order id" });
  model.bookingStatus = "confirmed";
  await model.save();
  return res.status(200).json({ success: true, msg: "Confirmed" });
};
