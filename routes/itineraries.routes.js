/* const Motorbike = require("../models/Motorbike.model"); */
const Itinerary = require("../models/Itinerary.model");

const router = require("express").Router();

// Endpoints
/* CREAR -create[<C>-R-U-D] */
router.get("/new", (req, res) => {
    Itinerary.find()
        .then(Itineraries => {
            res.render("motorbikes/create-motorbike", { Itinerary })
        })

})


router.post("/new", (req, res) => {
    const { name, description, distance, difficulty, location, user_id,} = req.body


    Itinerary.create({ name, description, distance, difficulty, location, user_id, })
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