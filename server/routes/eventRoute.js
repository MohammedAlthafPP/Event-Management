const express = require("express");
const router = express.Router();
const { createBride, createGroom, addMarriageInfo, deleteEvent, getAllEvents, eventDeatils } = require("../controllers/eventController");

router.route("/admin/event/bride").post(createBride);
router.route("/admin/event/groom").put(createGroom);
router.route("/admin/event/marriage").put(addMarriageInfo);
router.route("/admin/event/:id").delete(deleteEvent);
router.route("/events").get(getAllEvents);
router.route("/event/:id").get(eventDeatils);


module.exports = router;