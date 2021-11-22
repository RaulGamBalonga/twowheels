// TODO hay que cambiar PM por ADMIN


module.exports = {
    isPM: (user) => user?.role === "PM",
}