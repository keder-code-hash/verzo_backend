const express = require("express");
const router = express.Router();
const shopController = require("../Controllers/shops");

router.get("/get-all-shops", shopController.getAllShops);
router.get("/get-shop-by-id/:shopId", shopController.getShopById);
router.get("/get-shop-services/:shopId", shopController.getShopServices);

router.post("/add-shop", shopController.addShop);
router.post("/add-shop-service", shopController.addShopService);
router.post("/add-sub-service-option", shopController.addSubServiceOptions);
router.post("/add-sub-service", shopController.addShopSubService);

module.exports = router;
