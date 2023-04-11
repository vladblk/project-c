const express = require("express");
const destinationController = require("../controllers/destinationController");

const router = express.Router();

router
  .route("/")
  .get(destinationController.getAllDestinations)
  .post(destinationController.addDestination);

router
  .route("/:id")
  .get(destinationController.getDestination)
  .patch(destinationController.updateDestination)
  .delete(destinationController.deleteDestination);

module.exports = router;
