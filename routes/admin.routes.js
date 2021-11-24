// eliminar y editar usuario.

const User = require("../models/User.model")

const router = require("express").Router();

/* LEER -read [C-<R>-U-D] */
// listado de usuarios
router.get("/list", (req, res, next) => {

    User.find()

        .then(users => res.render("admin/list-user", { users }))
        .catch(err => console.log(err))
});

/* BORRAR -delete [C-R-U-<D>] */
// Borrar un usuario

router.get("/delete", (req, res) => {
    const { id } = req.query


    User.findByIdAndDelete(id)
        .then(info => {
            console.log(info)
            res.redirect("/admin/list")
        })
        .catch(err => console.log(err))

})

// /* EDITAR -update [C-R-<U>-D] */
//  editar usuario
router.get("/edit/:id", (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then((user) => {
            res.render("admin/edit-user", {
                user,
                enum: ["USER", "ADMIN"]
            })
        })
        .catch(err => console.log(err))




})




router.post("/edit", (req, res) => {
    const { id } = req.query
    const { username, license, imageURL } = req.body

    User.findByIdAndUpdate(id, { username, license, imageURL }, { new: true })
        .then(updatedUser => {
            res.redirect("/admin/list")
        })
        .catch(err => console.log(err))


})

module.exports = router