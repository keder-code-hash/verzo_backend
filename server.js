require("dotenv").config();
const express = require("express");
const shopsRoute = require("./Routes/shops");
const bookingsRoute = require("./Routes/bookings");
const app = express();

PORT = process.env.PORT || 8000;
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

require("./Database/index");

app.use("/api/shop", shopsRoute);
app.use("/api/booking", bookingsRoute);

app.listen(PORT, () => {
  console.log(`Server ${PORT} is up and running`);
});
