const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:vervoer2001@cluster0.5th8gyg.mongodb.net/Vervoer?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Error in database connection", err.message));
