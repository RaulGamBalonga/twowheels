const motorbike = require("../models/coaster.model");
const Itinerary = require("../models/coaster.model");

const router = require("express").Router();

// Endpoints
/* CREAR -create[<C>-R-U-D] */
router.get("/new", (req, res) => {
    Motorbike.find()
        .then(motorbikes => {
            res.render("motorbikes/create-motorbike", { Motorbike })
        })

})


router.post("/new", (req, res) => {
    const { name, typesMotorbike, description, brand, cc, weight, imageURL, license, user_id } = req.body


    Motorbike.create({ name, typesMotorbike, description, brand, cc, weight, imageURL, license, user_id })
        .then(createdMotorbike => res.redirect("/"))
        .catch(err => console.log(err))
}
)

/* LEER -read [C-<R>-U-D] */
// listado de todas las montañas rusas
router.get("/", (req, res, next) => {

    Motorbike.find()
        /* .populate('park_id') */
        .then(motorbike => res.render("motorbikes/read-motorbike", { motorbikes }))
        .catch(err => console.log(err))
});
