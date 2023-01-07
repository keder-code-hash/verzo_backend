const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://saibal-roy:bwFzMmLTKEY4mgzs@freecluster.eiwhf.mongodb.net/verover",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in database connection", err.message));
