const Users = require("../Models/users");
const Addresses = require("../Models/addresses");

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById({ _id: userId }).populate("addressIds");
    return res.status(200).json({ status: true, data: user });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    let newUser = new Users(req.body);
    newUser = await newUser.save();
    return res.status(200).json({ status: true, data: newUser });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.addUserAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    let newAddress = new Addresses(req.body);
    newAddress = await newAddress.save();
    const newAddressId = newAddress._id.toString();

    //Updating the user model with the newly added address
    const updatedUser = await Users.findByIdAndUpdate(
      { _id: userId },
      { $push: { addressIds: newAddressId } },
      { new: true }
    ).lean();
    return res.status(200).json({ status: true, data: updatedUser });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.updateUserAddress = async (req, res) => {
  try {
    const addressId = req.body.addressId;
    const updatedAddress = await Addresses.findByIdAndUpdate(
      { _id: addressId },
      req.body,
      { new: true }
    ).lean();
    return res.status(200).json({ status: true, data: updatedAddress });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteUserAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const deletedAddress = await Addresses.findByIdAndDelete({
      _id: addressId,
    });

    const userId = deletedAddress?.userId;
    const updatedUser = await Users.findByIdAndUpdate(
      { _id: userId },
      { $pull: { addressIds: addressId } },
      { new: true }
    ).lean();
    return res.status(200).json({ status: true, data: updatedUser });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedUser = await Users.findById({ _id: userId }, req.body).lean();
    return res.status(200).json({ status: true, data: updatedUser });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
