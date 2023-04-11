const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
