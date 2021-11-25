//
const { isLoggedIn } = require("../middlewares");
const Itinerary = require("../models/Itinerary.model");
const Motorbike = require("../models/Motorbike.model");
const User = require("../models/User.model");
const router = require("express").Router()


/////////// CON PROMISE ALL
router.get("/", (req, res) => {
    const { id } = req.query

    //Promise ALL recibe un array de promesas
    const promiseArr = [Motorbike.find({ user_id: req.session.currentUser?._id }), Itinerary.find({ user_id: req.session.currentUser?._id })]

    Promise.all(promiseArr)
        //la respuesta es el resultado de cada promesa en el mismo orden que entraron
        .then(response => {
            console.log(response)
            const motorbikes = response[0]
            const itineraries = response[1]
            res.render("users/user", { motorbikes, itineraries, user: req.session.currentUser })
        })
        .catch(err => console.log(err))

})

module.exports = router


/* Cloudinary para subir foto de perfil */
// router.post("/new", fileUploader.single('imageURL'), (req, res) => {
//     const {username,license,imageURL } = req.body
//     console.log(req.file);

//     User.create({ imageURL: req.file.path, license, user_id: req.session.currentUser._id })
//         .then(createdUser => res.redirect(""))
//         .catch(err => console.log(err))
// }
// )

/* const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase(); */
