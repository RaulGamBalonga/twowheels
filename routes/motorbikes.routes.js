const Motorbike = require("../models/Motorbike.model");
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn } = require("../middlewares");
/* const Itinerary = require("../models/Itinerary.model"); */

const router = require("express").Router();

// Endpoints
/* CREAR -create[<C>-R-U-D] Crear modelo de moto con su tipo su marca su imagen etc.. */

router.get("/new", isLoggedIn, (req, res) => {

    res.render("motorbikes/create-motorbikes", {

        brands: ["BMW", "HONDA", "HARLEY-DAVIDSON"],
        typesMotorbike: ["URBAN", "TRAIL", "CUSTOM"],
        license: ["A1", "A2", "A"]
    })

})


router.post("/new", fileUploader.single('imageURL'), (req, res) => {
    const { name, typesMotorbike, description, brand, cc, weight, license, } = req.body
    console.log(req.file);

    Motorbike.create({ name, typesMotorbike, description, brand, cc, weight, imageURL: req.file.path, license, user_id: req.session.currentUser._id })
        .then(createdMotorbike => res.redirect("/motorbikes/list"))
        .catch(err => console.log(err))
}
)

/* LEER -read [C-<R>-U-D] */
// listado de todas las motos
router.get("/list", (req, res, next) => {

    Motorbike.find()

        .then(motorbikes => res.render("motorbikes/list-motorbikes", { motorbikes }))
        .catch(err => console.log(err))
});

/* BORRAR -delete [C-R-U-<D>] */
// Borrar una moto

router.get("/delete", (req, res) => {
    const { id } = req.query


    Motorbike.findByIdAndDelete(id)
        .then(info => {
            console.log(info)
            res.redirect("/motorbikes/list")
        })
        .catch(err => console.log(err))

})

// /* EDITAR -update [C-R-<U>-D] */
//  editar modelo moto
router.get("/edit/:id", (req, res) => {
    const { id } = req.params
    Motorbike.findById(id)
        .then((motorbike) => {
            res.render("motorbikes/update-motorbikes", {
                motorbike,
                brands: ["BMW", "HONDA", "HARLEY-DAVIDSON"],
                typesMotorbike: ["URBAN", "TRAIL", "CUSTOM"],
                license: ["A1", "A2", "A"]
            })
        })
        .catch(err => console.log(err))




})




router.post("/edit", (req, res) => {
    const { id } = req.query
    const { name, typesMotorbike, description, brand, cc, weight, imageURL, license } = req.body

    Motorbike.findByIdAndUpdate(id, { name, typesMotorbike, description, brand, cc, weight, imageURL, license }, { new: true })
        .then(updatedMotorbike => {
            res.redirect("/motorbikes/list")
        })
        .catch(err => console.log(err))


})

/* LEER -read [C-<R>-U-D] */
//Detallles de una moto
router.get("/:id", (req, res, next) => {
    const { id } = req.params

    Motorbike.findById(id)

        .then(motorbike => res.render("motorbikes/details-motorbikes", motorbike))
        .catch(err => console.log(err))
});




module.exports = router