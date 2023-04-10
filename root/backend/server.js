require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Listening to port 3000..."));
