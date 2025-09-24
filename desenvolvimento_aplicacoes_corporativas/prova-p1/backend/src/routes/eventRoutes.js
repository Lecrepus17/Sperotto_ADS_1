const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", EventController.getEvents);
router.post("/", authMiddleware.verifyAdmin, EventController.createEvent);

module.exports = router;
