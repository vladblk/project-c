const express = require("express");
const destinationRouter = require("./routes/destinationRoutes");
const app = express();

app.use(express.json());

// mount the destination router as a middleware
app.use("/api/v1/destinations", destinationRouter);

module.exports = app;
