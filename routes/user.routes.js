const router = require("express").Router()

router.get("/", (req, res, next) => {
    // Promise.all([pr1, pr2,...])
    res.render("users/user")
})

module.exports = router