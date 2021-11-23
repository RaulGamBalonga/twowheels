const { isLoggedIn } = require("../middlewares");
const Itinerary = require("../models/Itinerary.model");
const router = require("express").Router();


router.get("/new", (req, res) => {

    res.render("itineraries/create-itinerary", {

        difficulty: ["EASY", "NORMAL", "HARD", "HELL IN THE EARTH"],
        description: ["ASPHALT", "GRAVEL", "ENDURO", "HARD ENDURO", "DAKAR"]
    })
})




router.post("/new", isLoggedIn, (req, res) => {
    const { name, description, distance, difficulty, longitude, latitude} = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }


    Itinerary.create({ name, description, distance, difficulty, user_id: req.session.currentUser._id, $push: { location: location } })
        .then(createdItinerary => res.redirect("/"))
        .catch(err => console.log(err))
}
)

/* LEER -read [C-<R>-U-D] */
// listado de todas las montañas rusas
router.get("/", (req, res, next) => {

    Itinerary.find()
        /* .populate('park_id') */
        .then(Itinerary => res.render("motorbikes/read-motorbike", { Itinerary }))
        .catch(err => console.log(err))
});
module.exports = router






module.exports = router