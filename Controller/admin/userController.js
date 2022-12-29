const Auth = require('../../Model/Auth');
const DryCleaning = require('../../Model/Drycleaning');
const dryCleanerBooking = require('../../Model/dryCleanerBooking');
const Parking = require('../../Model/Parking');
const parkingSpace = require('../../Model/parkingSpace');
const parkingCarSpot = require('../../Model/parkingCarSpot');

exports.listUser = async (req, res) => {
    let model = await Auth.find({ accountType: { $ne: "admin" } });
    return res.status(200).json({ success: true, data: model  });
};

exports.userBlockUnBlock = async (req, res) => {
    let model = await Auth.findById(req.body.userId);
    let message = "";
    if(model && model.accountStatus == "blocked"){
        model.accountStatus = "active";
        message = "active";
    } else if(model && model.accountStatus == "active"){
        model.accountStatus = "blocked";
        message = "blocked";
    }
    await model.save();
    return res.status(200).json({ success: true, msg: message });
};

exports.deleteUser = async (req, res) => {
    await Auth.deleteOne({ id: req.body.userId });

    await DryCleaning.deleteMany({userId: req.body.userId});
    await dryCleanerBooking.deleteMany({bookingBy: req.body.userId});
    await dryCleanerBooking.deleteMany({bookingTo: req.body.userId});

    await Parking.deleteMany({userId: req.body.userId});
    await parkingSpace.deleteMany({userId: req.body.userId});
    await parkingCarSpot.deleteMany({userId: req.body.userId});
    return res.status(200).json({ success: true, msg: "deleted"  });
};