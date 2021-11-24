// TODO hay que cambiar PM por ADMIN


module.exports = {
    isADMIN: (user) => user?.usertype === "ADMIN",
}