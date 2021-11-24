const { isLoggedIn } = require("../middlewares");
const Itinerary = require("../models/Itinerary.model");
const router = require("express").Router();




// Endpoints
/* CREAR -create[<C>-R-U-D] Crear itinerario con su location inicial (longitud, latitud) y location final (longitud y latitud).. */

router.get("/new", (req, res) => {

    res.render("itineraries/create-itinerary", {

        difficulty: ["EASY", "NORMAL", "HARD", "HELL IN THE EARTH"],
        description: ["ASPHALT", "GRAVEL", "ENDURO", "HARD ENDURO", "DAKAR"]
    })
})




router.post("/new", isLoggedIn, (req, res) => {
    const { name, description, distance, difficulty, longitude, latitude } = req.body

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
// Listado de todos los itinerarios
router.get("/list", (req, res, next) => {

    Itinerary.find()

        .then(itineraries => res.render("itineraries/list-itinerary", { itineraries }))
        .catch(err => console.log(err))
});

/* BORRAR -delete [C-R-U-<D>] */
// Borrar un itinerario.

router.get("/delete", (req, res) => {
    const { id } = req.query


    Itinerary.findByIdAndDelete(id)
        .then(info => {
            console.log(info)
            res.redirect("/itinerarios/list")
        })
        .catch(err => console.log(err))

})


// /* EDITAR -update [C-R-<U>-D] */
//  editar modelo moto
router.get("/edit/:id", (req, res) => {
    const { id } = req.params
    Itinerary.findById(id)
        .then((itinerary) => {
            res.render("itineraries/update-itinerary", {
                itinerary,
                difficulty: ["EASY", "NORMAL", "HARD", "HELL IN THE EARTH"],
                description: ["ASPHALT", "GRAVEL", "ENDURO", "HARD ENDURO", "DAKAR"]

            })
        })
        .catch(err => console.log(err))




})




router.post("/edit", (req, res) => {
    const { id } = req.query
    const { name, description, distance, difficulty, longitude, latitude } = req.body
console.log(req.body)
    Itinerary.findByIdAndUpdate(id, { name, description, distance, difficulty, longitude, latitude }, { new: true })
        .then(updatedItinerary => {
            res.redirect("/itinerarios/list")
        })
        .catch(err => console.log(err))


})

/* LEER -read [C-<R>-U-D] */
//Detallles de un Itinerario
router.get("/:id", (req, res, next) => {
    const { id } = req.params

    Itinerary.findById(id)

        .then(itineraries => res.render("itineraries/details-itinerary", itineraries))
        .catch(err => console.log(err))
});




module.exports = router