
const router = require("express").Router();
const Itinerary = require("../models/Itinerary.model");

router.get("/itineraries", (req, res) => {
    Itinerary
    .find()
    .then(res => res.json(res))

})

module.exports = router