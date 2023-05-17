const DryCleaning = require("../Model/Drycleaning");
const Auth = require("../Model/Auth");
const dryCleanerBooking = require("../Model/dryCleanerBooking");
const Order = require("../Model/Order");
const Delivery = require("../Model/Delivery");

exports.bookingDeliveryBoy = async (req, res) => {
  console.log("called");
  let model = await Delivery.create({
    orderId: req.body.orderId,
    assignedTo: req.body.assignedTo,
    bookingStatus: req.body.bookingStatus,
  });
  await model.save();
  return res.status(200).json({
    success: true,
    msg: "Assigned Successfully",
    delivery_boy_booking_id: model._id,
    delivery_boy_assignee_id: model.assignedTo._id,
    delivery_boy_booking_status: model.bookingStatus,
  });
};

exports.fetchDeliveryByByOrderId = async (req, res) => {
  let model = await Delivery.find({
    orderId: req.body.orderId,
  });
  const result = {
    model: model,
  };
  console.log(result);
  return res.status(200).json({ success: true, msg: "list", data: result });
};

exports.fetchDelivery = async (req, res) => {
  let model = await Delivery.find();
  const result = {
    model: model,
  };
  console.log(result);
  return res.status(200).json({ success: true, msg: "list", data: result });
};

exports.fetchDeliveryByByUserId = async (req, res) => {
  let model = await Delivery.find({
    assignedTo: req.body.assignedTo,
  });
  const result = {
    model: model,
  };
  console.log(result);
  return res.status(200).json({ success: true, msg: "list", data: result });
};

exports.updateDeliveryAcceptingStatus = async (req, res) => {
  let model = await Delivery.findOne({
    orderId: req.body.orderId,
    assignedTo: req.body.assignedTo,
  });
  if (!model)
    return res.status(200).json({ success: false, msg: "Invalid order id" });
  model.bookingStatus = "confirmed";
  console.log("called" + JSON.stringify(model));
  await model.save();
  return res.status(200).json({ success: true, msg: "Confirmed" });
};

exports.updateDeliveryRejectingStatus = async (req, res) => {
  let model = await Delivery.findOne({
    orderId: req.body.orderId,
    assignedTo: req.body.assignedTo,
  });
  if (!model)
    return res.status(200).json({ success: false, msg: "Invalid order id" });
  model.bookingStatus = "cancelled";
  await model.save();
  return res.status(200).json({ success: true, msg: "Confirmed" });
};
