
// copiado del repo de Teo mirar cambios que hacer

// Mirar license linea 11 y linea 48

const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isADMIN } = require("../utils")

// Signup
router.get('/registro', (req, res) => res.render('auth/signup', { license: ["A1", "A2", "A"] }))
router.post('/registro', (req, res) => {

    const { username, userPwd, license } = req.body

    if (userPwd.length === 0 || username.length === 0) {
        res.render('auth/signup', { errorMsg: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('auth/signup', { errorMsg: 'Usuario ya registrado' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(userPwd, salt)

            User
                .create({ username, password: hashPass, license })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})



// Login
router.get('/iniciar-sesion', (req, res) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res) => {

    const { username, userPwd } = req.body

    if (userPwd.length === 0 || username.length === 0) {
        res.render('auth/login', { errorMsg: 'Rellena los campos' })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMsg: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMsg: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            req.app.locals.isLogged = true
            req.app.locals.isAdmin = isADMIN(user)
            res.redirect('/')
        })
        .catch(err => console.log(err))

})


// Logout
router.get('/cerrar-sesion', (req, res) => {
    req.app.locals.isADMIN = false;
    req.app.locals.isLogged = false;
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router