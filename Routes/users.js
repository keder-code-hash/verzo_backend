const express = require("express");
const router = express.Router();
const userController = require("../Controllers/users");

router.get("/get-user-by-id/:userId", userController.getUserById);
router.post("/add-new-user", userController.addUser);
router.post("/add-new-user-address", userController.addUserAddress);
router.patch("/update-user", userController.updateUser);
router.patch("/update-user-address", userController.updateUserAddress);
router.delete(
  "/delete-user-address/:addressId",
  userController.deleteUserAddress
);

module.exports = router;
