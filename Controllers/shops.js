const Shops = require("../Models/shops");
const Service = require("../Models/services");
const SubServiceOption = require("../Models/subServiceOptions");
const SubService = require("../Models/subServices");

exports.addShop = async (req, res) => {
  try {
    const newShop = new Shops(req.body);
    await newShop.save();
    return res.status(201).json({ status: true, data: newShop });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.addShopService = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const serviceName = req.body.serviceName;
    const newService = new Service({
      dryCleanShopId: shopId,
      name: serviceName,
    });
    await newService.save();
    return res.status(201).json({ status: true, data: newService });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.addShopSubService = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const newSubService = new SubService({
      ...req.body,
      dryCleanShopId: shopId,
    });
    await newSubService.save();
    return res.status(201).json({ status: true, data: newSubService });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.addSubServiceOptions = async (req, res) => {
  try {
    const newSubServiceOption = new SubServiceOption(req.body);
    await newSubServiceOption.save();
    return res.status(201).json({ status: true, data: newSubServiceOption });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const allShops = await Shops.find({}).lean();
    return res.status(200).json({ status: true, data: allShops });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shop = await Shops.findById({ _id: shopId }).lean();
    return res.status(200).json({ status: true, data: shop });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.getShopServices = async (req, res) => {
  try {
    const dryCleanShopId = req.params.shopId;
    const allServices = await Service.find({
      dryCleanShopId: dryCleanShopId,
    }).lean();

    const allSubServices = await SubService.find({
      dryCleanShopId: dryCleanShopId,
    })
      .populate("options")
      .lean();

    for (const service of allServices) {
      service.subServices = [];
      for (const subservice of allSubServices) {
        if (subservice.serviceId.toString() === service._id.toString()) {
          service.subServices.push(subservice);
        }
      }
    }

    return res.status(200).json({ status: true, data: allServices });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const updatedShop = await Shops.findByIdAndUpdate(
      { _id: shopId },
      { new: true }
    ).lean();
    return res.status(201).json({ status: true, data: updatedShop });
  } catch (err) {
    res.status(503).json({ status: false, error: err.message });
  }
};
