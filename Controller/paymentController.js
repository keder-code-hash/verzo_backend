const Order = require("../Model/Order");
const Auth = require("../Model/Auth");

const stripe = require("stripe")(
  "sk_test_51GmciYFV0GaG5oxzVIDkog7wdFShykamdXuePWfKRN14EuL1XWYe43qRwFFt7ztidp3dF821MQGIQGrQqLDpjvoq00r2m4oTsM"
);

// generate OTP of otp_length
exports.generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.checkout_session = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: "https://keder-code-hash.github.io/vorzo_web_pages/success",
    cancel_url: "https://keder-code-hash.github.io/vorzo_web_pages/error",
  });
  res.send({ url: session.url, payment_intent: session.payment_intent });
};

exports.payment_intent_webhooks = async (request, response) => {
  let event = request.body;
  let paymentIntent;
  switch (event.type) {
    case "payment_intent.amount_capturable_updated":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.created":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.partially_funded":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.processing":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.requires_action":
      paymentIntent = event.data.object;
      break;
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      await Order.create({
        webhook_id: event.id,
        paymentIntent: paymentIntent.id,
        moneyValue: paymentIntent.amount_received,
        currencyCode: paymentIntent.currency,
        reciept_url: event.data.object.charges.data[0].reciept_url,
        otp: this.generateOTP(4),
        status: "success",
        customerId: paymentIntent.customer,
        payment_method_details: JSON.stringify(
          event.data.object.charges.data[0].payment_method_details
        ),
        billing_address_details: JSON.stringify(
          event.data.object.charges.data[0].billing_details.address
        ),
        billing_mail: event.data.object.charges.data[0].billing_details.email,
      }).then((result) =>
        console.log("Order Successfully created : " + result._id)
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
};

exports.update_payment_details_after_webhook = async (req, res) => {
  try {
    let otp;
    const orderByPI = await Order.find({
      paymentIntent: req.body.paymentIntent,
    });
    if (orderByPI.length > 1) {
      return res.json({
        success: false,
        error: "Something internal server error",
      });
    }
    const order = await Order.findById(orderByPI[0]._id);
    console.log(req.body);
    order.parkingId = req.body.booking_details.parking_id;
    order.parkingSpotId = req.body.booking_details.parking_spot_id;
    order.bookingId = req.body.booking_details.booking_id;
    order.parkingCarSpotId = req.body.booking_details.parkingCarSpotId;
    order.bookingType = req.body.booking_details.bookingType;
    order.save().then((result) => {
      otp = result.otp;
      console.log("data success fully updated for odrder : " + result._id);
      console.log("otp: " + otp);
      return res.status(200).json({ success: true, msg: otp });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "Something internal server error",
    });
  }
};

exports.get_otp_by_booking_id = async (bookingId) => {
  try {
    const orderByPI = await Order.find({
      bookingId: bookingId,
    });
    console.log(orderByPI[0]);
    const otp = orderByPI[0].otp;

    return { otp: otp };
  } catch (error) {
    console.log(error);
  }
};
exports.get_all_otps = async (req, res) => {
  try {
    const orders = await Order.find({});
    let otps = [];
    orders.map((order) => {
      otps.push({
        order_id: order.bookingId,
        otp: order.otp,
      });
    });

    console.log(otps);
    return res.status(200).json({ success: true, msg: "success", otps: otps });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "Something internal server error",
    });
  }
};
