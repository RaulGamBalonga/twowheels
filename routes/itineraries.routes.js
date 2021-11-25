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
    const { name, description, distance, difficulty, longitude1, latitude1, longitude2, latitude2 } = req.body

    const initLocation = {
        type: 'Point',
        coordinates: [latitude1, longitude1]
    }

    const endLocation = {
        type: 'Point',
        coordinates: [latitude2, longitude2]
    }


    Itinerary.create({ name, description, distance, difficulty, user_id: req.session.currentUser._id })
        .then(itinerary => Itinerary.findByIdAndUpdate(itinerary._id, { $push: { location: { $each: [initLocation, endLocation] } }}))
        .then(() => res.redirect("/itinerarios/list"))
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
    const { name, description, distance, difficulty, longitude1, latitude1, longitude2, latitude2 } = req.body

    const initLocation = {
        type: 'Point',
        coordinates: [latitude1, longitude1]
    }

    const endLocation = {
        type: 'Point',
        coordinates: [latitude2, longitude2]
    }

    Itinerary.findByIdAndUpdate(id, { name, description, distance, difficulty, "location.0": initLocation, "location.1": endLocation  }, { new: true })
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

        .then(itinerary => {
            console.log(itinerary.location.coordinates);
            res.render("itineraries/details-itinerary", itinerary)})
        .catch(err => console.log(err))
});




module.exports = router