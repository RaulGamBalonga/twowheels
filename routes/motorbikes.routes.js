const Motorbike = require("../models/Motorbike.model");
/* const Itinerary = require("../models/Itinerary.model"); */

const router = require("express").Router();

// Endpoints
/* CREAR -create[<C>-R-U-D] */
router.get("/new", (req, res) => {
    
            res.render("motorbikes/create-motorbikes", { brands: ["BMW", "HONDA", "HARLEY-DAVIDSON"] })

})


router.post("/new", (req, res) => {
    const { name, typesMotorbike, description, brand, cc, weight, imageURL, license, } = req.body


    Motorbike.create({ name, typesMotorbike, description, brand, cc, weight, imageURL, license, })
        .then(createdMotorbike => res.redirect("/"))
        .catch(err => console.log(err))
}
)

/* LEER -read [C-<R>-U-D] */
// listado de todas las montañas rusas
router.get("/", (req, res, next) => {

    Motorbike.find()

        .then(motorbike => res.render("motorbikes/read-motorbike", { motorbike }))
        .catch(err => console.log(err))
});
module.exports = router